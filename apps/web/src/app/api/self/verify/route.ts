import { NextResponse } from 'next/server';
import { createPublicClient, http, isAddress } from 'viem';
import type { Address } from 'viem';

import { env } from '@/lib/env';

const SELF_VERIFICATION_ABI = [
  {
    name: 'isVerified',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ type: 'bool' }],
  },
] as const;

const rpcUrl = env.CELO_RPC_URL;
const viemClient = createPublicClient({
  transport: http(rpcUrl),
});

type VerificationRequest = {
  did?: string;
  address?: string;
  proof?: unknown;
  verificationResult?: Record<string, unknown>;
  user?: { did?: string };
  userDid?: string;
};

function extractDid(payload: VerificationRequest): string | undefined {
  if (payload.did) {
    return payload.did;
  }
  if (payload.userDid) {
    return payload.userDid;
  }
  if (payload.user?.did) {
    return payload.user.did;
  }
  const result = payload.verificationResult ?? payload.proof;
  if (result && typeof result === 'object') {
    const maybeDid = (result as Record<string, unknown>).did;
    if (typeof maybeDid === 'string') {
      return maybeDid;
    }
    const user = (result as Record<string, unknown>).user as Record<string, unknown> | undefined;
    if (user && typeof user.did === 'string') {
      return user.did as string;
    }
  }
  return undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerificationRequest;
    const did = extractDid(body);
    const { address } = body;

    if (!did) {
      return NextResponse.json(
        { success: false, error: 'Missing DID from Self verification response.' },
        { status: 400 }
      );
    }

    const userAddress = address as Address | undefined;
    if (userAddress && !isAddress(userAddress)) {
      return NextResponse.json(
        { success: false, error: 'Invalid wallet address supplied.' },
        { status: 400 }
      );
    }

    if (env.SELF_VERIFIER_ENDPOINT) {
      const upstream = await fetch(env.SELF_VERIFIER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const upstreamPayload = await upstream.json();
      if (!upstream.ok || upstreamPayload?.success === false) {
        const errorMessage = upstreamPayload?.error ?? 'Self backend verification failed';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
      }
    }

    if (!env.SELF_VERIFIER_CONTRACT || !userAddress) {
      return NextResponse.json(
        {
          success: true,
          did,
          address: userAddress,
          stubbed: true,
          message:
            'SELF_VERIFIER_CONTRACT or wallet address missing. Returning optimistic verification for local development.',
        },
        { status: 200 }
      );
    }

    const onChainVerification = await viemClient.readContract({
      address: env.SELF_VERIFIER_CONTRACT as Address,
      abi: SELF_VERIFICATION_ABI,
      functionName: 'isVerified',
      args: [userAddress],
    });

    return NextResponse.json(
      {
        success: Boolean(onChainVerification),
        did,
        address: userAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[SelfVerifyAPI] verification failed', error);
    return NextResponse.json(
      { success: false, error: 'Unable to validate Self proof. Check server logs.' },
      { status: 500 }
    );
  }
}

