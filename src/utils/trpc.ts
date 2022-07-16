// src/utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../server/router";

export const trpc = createReactQueryHooks<AppRouter>();

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://lptickets-co.vercel.app";

/**
 * Check out tRPC docs for Inference Helpers
 * https://trpc.io/docs/infer-types#inference-helpers
 */
