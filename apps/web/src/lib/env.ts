import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {
    JWT_SECRET: z.string().min(1).optional().default("build-time-placeholder"),
    CELO_RPC_URL: z.string().url().optional().default("https://forno.celo.org"),
    SELF_VERIFIER_CONTRACT: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/)
      .optional(),
    SELF_VERIFIER_CHAIN_ID: z
      .coerce.number()
      .optional()
      .default(11142220),
    SELF_VERIFIER_ENDPOINT: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().min(1).optional().default("http://localhost:3000"),
    NEXT_PUBLIC_APP_ENV: z
      .enum(["development", "production"])
      .optional()
      .default("development"),
    NEXT_PUBLIC_FARCASTER_HEADER: z.string().min(1).optional().default("build-time-placeholder"),
    NEXT_PUBLIC_FARCASTER_PAYLOAD: z.string().min(1).optional().default("build-time-placeholder"),
    NEXT_PUBLIC_FARCASTER_SIGNATURE: z.string().min(1).optional().default("build-time-placeholder"),
    NEXT_PUBLIC_SELF_CERAMIC: z
      .string()
      .min(1)
      .optional()
      .default("mainnet-gateway"),
    NEXT_PUBLIC_SELF_CONNECT_NETWORK: z
      .string()
      .min(1)
      .optional()
      .default("mainnet"),
    NEXT_PUBLIC_SELF_QR_ENDPOINT: z
      .string()
      .min(1)
      .optional()
      .default(`${process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}/api/self/verify`),
    NEXT_PUBLIC_SELF_APP_NAME: z.string().min(1).optional().default("SisterSafe"),
    NEXT_PUBLIC_SELF_APP_SCOPE: z.string().min(1).optional().default("sister-safe-scope"),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_FARCASTER_HEADER: process.env.NEXT_PUBLIC_FARCASTER_HEADER,
    NEXT_PUBLIC_FARCASTER_PAYLOAD: process.env.NEXT_PUBLIC_FARCASTER_PAYLOAD,
    NEXT_PUBLIC_FARCASTER_SIGNATURE: process.env.NEXT_PUBLIC_FARCASTER_SIGNATURE,
    NEXT_PUBLIC_SELF_CERAMIC: process.env.NEXT_PUBLIC_SELF_CERAMIC,
    NEXT_PUBLIC_SELF_CONNECT_NETWORK: process.env.NEXT_PUBLIC_SELF_CONNECT_NETWORK,
    NEXT_PUBLIC_SELF_QR_ENDPOINT: process.env.NEXT_PUBLIC_SELF_QR_ENDPOINT,
    NEXT_PUBLIC_SELF_APP_NAME: process.env.NEXT_PUBLIC_SELF_APP_NAME,
    NEXT_PUBLIC_SELF_APP_SCOPE: process.env.NEXT_PUBLIC_SELF_APP_SCOPE,
  },
});
