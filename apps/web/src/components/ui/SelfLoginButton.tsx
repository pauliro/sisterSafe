'use client';

import { useState } from 'react';
import { EthereumAuthProvider, SelfID } from '@self.id/web';

import { env } from '@/lib/env';

type Props = {
  userAddress?: `0x${string}` | null;
  onVerificationComplete?: (payload: { did: string }) => void;
};

async function createAuthProvider(preferredAddress?: string | null) {
  if (!window.ethereum) throw new Error('MetaMask not found');
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const address = preferredAddress ?? accounts?.[0];
  if (!address) {
    throw new Error('No wallet address selected');
  }
  return new EthereumAuthProvider(window.ethereum, address);
}

export default function SelfLoginButton({ userAddress, onVerificationComplete }: Props) {
  const [did, setDid] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'verifying' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function connectSelfID() {
    try {
      setErrorMessage(null);
      setStatus('connecting');

      const authProvider = await createAuthProvider(userAddress);
      const selfID = await SelfID.authenticate({
        authProvider,
        ceramic: env.NEXT_PUBLIC_SELF_CERAMIC,
        connectNetwork: env.NEXT_PUBLIC_SELF_CONNECT_NETWORK,
      });

      setStatus('verifying');
      const response = await fetch('/api/self/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          did: selfID.id,
          address: userAddress,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload?.error ?? 'Unable to validate proof');
      }

      setStatus('success');
      setDid(selfID?.id || null);
      onVerificationComplete?.({ did: selfID.id });
    } catch (err: any) {
      console.error('[SelfLoginButton] verification error', err);
      const message =
        typeof err?.message === 'string' && err.message.includes('Invalid base URL')
          ? 'Self SDK could not reach the Ceramic node. Check NEXT_PUBLIC_SELF_CERAMIC / NEXT_PUBLIC_SELF_CONNECT_NETWORK.'
          : err?.message ?? 'Unable to verify identity';
      setErrorMessage(message);
      setStatus('error');
    }
  }

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card/70 p-4 shadow-soft">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Step 1 – Authenticate with Self to obtain a DID before writing on-chain.
        </p>
        <button
          onClick={connectSelfID}
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          disabled={status === 'connecting' || status === 'verifying'}
        >
          {status === 'connecting'
            ? 'Connecting...'
            : status === 'verifying'
            ? 'Validating proof...'
            : did
            ? 'Re-run identity check'
            : 'Login with Self'}
        </button>
        {status === 'success' && did ? (
          <span className="text-xs text-green-500">
            DID connected: <span className="font-mono">{did}</span>
          </span>
        ) : null}
        {errorMessage ? <span className="text-xs text-red-500">{errorMessage}</span> : null}
      </div>
    </div>
  );
}