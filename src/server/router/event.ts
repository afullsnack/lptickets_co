import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const CreateEventData = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  dateTime: z.date(),
  totalTickets: z.number(),
});

export const SingleEventInput = z.object({
  eventId: z.string(),
});

export const eventRouter = createRouter()
  .mutation("create", {
    input: CreateEventData,
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

      // Create the event and return the created event
      const event = await ctx.prisma.event.create({
        data: {
          ...input,
          creator: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });

      // Update user role from USER to PLANNER after creating event
      if (ctx.session.user?.role === "USER") {
        const updateUser = await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user?.id,
          },
          data: {
            role: "PLANNER",
          },
        });

        console.log(updateUser, "Updated user ");
      }

      return event;
    },
  })
  .query("getSingle", {
    input: SingleEventInput,
    async resolve({ input, ctx }) {
      console.log("Get one event input id", input.eventId);
      console.log("User session data", ctx.session);

      const event = await ctx.prisma.event.findUnique({
        where: {
          id: input.eventId,
        },
        include: {
          tickets: true,
          creator: true,
        },
      });

      console.log("returned event", event);

      return event;
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      // return await ctx.prisma.example.findMany();
      return await ctx.prisma.event.findMany();
    },
  });
