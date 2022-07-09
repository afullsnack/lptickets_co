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
      // Call prisma create event and return event
      console.log("Create event input", input);
      console.log("User session data", ctx.session?.user);

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session?.user?.email!,
        },
      });

      const event = await ctx.prisma.event.create({
        data: {
          ...input,
          creator: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      return event;
    },
  })
  .query("getOne", {
    input: SingleEventInput,
    async resolve({ input, ctx }) {
      console.log("Get one event input id", input.eventId);
      console.log("User session data", ctx.session);
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      // return await ctx.prisma.example.findMany();
    },
  });
