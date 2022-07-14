import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

const createTicketData = z.array(
  z.object({
    type: z.string(),
    cost: z.number(),
    ticketCount: z.number(),
    eventId: z.string(),
    addons: z.array(z.string()).nullish(),
  })
);

export type CreateTicketData = z.TypeOf<typeof createTicketData>;

const singleTicketInput = z.object({
  userId: z.string(),
});

export type SingleTicketInput = z.TypeOf<typeof singleTicketInput>;

export const ticketRoute = createRouter()
  .mutation("create", {
    input: createTicketData,
    async resolve({ ctx, input }) {
      // Check that user is logged in
      if (!ctx.session) {
        return new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create event while logged out",
        });
      }
      // Call prisma create event and return event
      console.log("Create event input", input);
      console.log("User session data", ctx.session?.user);
    },
  })
  .query("getAllUserTickets", {
    // input: singleTicketInput,
    async resolve({ input, ctx }) {
      // Check that user is logged in
      if (!ctx.session) {
        return new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot get tickets while logged out",
        });
      }
      console.log("Get one event input id");
      console.log("User session data", ctx.session);

      const tickets = await ctx.prisma.user.findMany({
        where: {
          id: ctx.session?.user?.id,
        },
        select: {
          tickets: true,
        },
      });

      console.log("returned event", event);

      return tickets;
    },
  })
  .query("getAllEventTickets", {
    input: z.object({
      eventId: z.string(),
    }),
    async resolve({ ctx, input }) {
      // return all tickets for an event
      return await ctx.prisma.ticket.findMany({
        where: {
          eventId: input.eventId,
        },
        include: {
          event: true,
        },
      });
    },
  });
