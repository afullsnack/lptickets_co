import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const CreateTicketData = z.object({
  type: z.string(),
  cost: z.number(),
  ticketCount: z.number(),
  eventId: z.string(),
  userId: z.string(),
});

export const SingleTicketInput = z.object({
  userId: z.string(),
});

export const ticketRoute = createRouter()
  .mutation("create", {
    input: CreateTicketData,
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
    input: SingleTicketInput,
    async resolve({ input, ctx }) {
      console.log("Get one event input id", input.userId);
      console.log("User session data", ctx.session);

      const tickets = await ctx.prisma.ticket.findMany({
        where: {
          userId: input.userId,
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
