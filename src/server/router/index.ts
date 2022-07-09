// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

// Routes
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { payRouter } from "./pay";
import { ticketRoute } from "./ticket";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("events.", eventRouter)
  .merge("ticket", ticketRoute)
  .merge("pay", payRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
