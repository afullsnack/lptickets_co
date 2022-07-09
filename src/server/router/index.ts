// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

// Routes
import { authRouter } from "./auth";
import { eventRouter } from "./events";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("events.", eventRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
