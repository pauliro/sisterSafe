'use client';

import { useEffect, useMemo, useState } from 'react';
import { SelfAppBuilder, SelfQRcodeWrapper } from '@selfxyz/qrcode';

import { env } from '@/lib/env';

type Props = {
  onVerificationComplete?: () => void;
};

const disclosures = {
  minimumAge: 18,
  ofac: true,
  name: true,
  nationality: true,
  date_of_birth: true,
};

export default function SelfQrVerification({ onVerificationComplete }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'ready' | 'verified' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isLocalEndpoint =
    !env.NEXT_PUBLIC_SELF_QR_ENDPOINT ||
    env.NEXT_PUBLIC_SELF_QR_ENDPOINT.includes('localhost') ||
    env.NEXT_PUBLIC_SELF_QR_ENDPOINT.includes('127.0.0.1');

  if (isLocalEndpoint) {
    return (
      <section className="rounded-2xl border border-dashed border-yellow-500/60 bg-yellow-500/10 p-4 text-sm text-yellow-900">
        <p className="font-semibold">QR verification disabled in local mode.</p>
        <p>
          The Self QR SDK rejects localhost endpoints. Set{' '}
          <code className="font-mono">NEXT_PUBLIC_SELF_QR_ENDPOINT</code> to a public HTTPS URL (e.g.
          ngrok or deployed API) to enable this component.
        </p>
      </section>
    );
  }

  useEffect(() => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;
    setUserId(id);
    setStatus('ready');
  }, []);

  const selfApp = useMemo(() => {
    if (!userId) return null;
    return new SelfAppBuilder({
      appName: env.NEXT_PUBLIC_SELF_APP_NAME,
      scope: env.NEXT_PUBLIC_SELF_APP_SCOPE,
      endpoint: env.NEXT_PUBLIC_SELF_QR_ENDPOINT,
      userId,
      disclosures,
    }).build();
  }, [userId]);

  if (!selfApp) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-dashed border-border bg-accent/20 p-4">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Scan with Self App</p>
          <p className="text-sm text-muted-foreground">
            Use the Self mobile app to scan the QR code and share your passport proof with SisterSafe.
          </p>
        </div>
        <div className="mx-auto max-w-[320px]">
          <SelfQRcodeWrapper
            selfApp={selfApp}
            size={320}
            onSuccess={() => {
              setStatus('verified');
              setErrorMessage(null);
              onVerificationComplete?.();
            }}
            onError={(data) => {
              setStatus('error');
              setErrorMessage(data?.reason ?? 'Verification failed. Please retry.');
            }}
          />
        </div>
        <p className="text-xs text-center text-muted-foreground">
          {status === 'verified'
            ? 'Proof received! You can proceed to on-chain verification.'
            : status === 'error'
            ? errorMessage ?? 'Verification failed. Please retry.'
            : 'Waiting for scan...'}
        </p>
      </div>
    </section>
  );
}

