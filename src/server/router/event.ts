import { Event } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

const createEventData = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  dateTime: z.date(),
  totalTickets: z.number(),
  // showTotalTickets: z.boolean(),
});

export type CreateEventData = z.TypeOf<typeof createEventData>;

const singleEventInput = z.object({
  eventId: z.string(),
});

export type SingleEventInput = z.TypeOf<typeof singleEventInput>;

export const eventRouter = createRouter()
  .mutation("create", {
    input: createEventData,
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
      const event: Event = await ctx.prisma.event.create({
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

        console.log(updateUser, "Updated user", event, "Event");
      }

      return event;
    },
  })
  .mutation("like", {
    input: z.object({ eventId: z.string() }),
    async resolve({ ctx, input }) {
      // Check that user is logged in
      if (!ctx.session) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot like event while logged out",
        });
      }

      // const likedEvent = await ctx.prisma.event.findUnique({
      //   where: { id: input.eventId },
      // });

      try {
        // Check if the event has been liked before
        // ctx.session.user?.faveEvents.forEach(async (val: string) => {
        //   if (val === input.eventId) {
        //     // remove event Id from list
        //     const updatedUserFaves = await ctx.prisma.user.update({
        //       where: {
        //         id: ctx.session?.user?.id,
        //       },
        //       data: {
        //         faveEvents: ctx.session?.user?.faveEvents.filter(
        //           (item) => item !== val
        //         ),
        //       },
        //     });

        //     return updatedUserFaves;
        //   }
        // });
        console.log(
          ctx.session?.user?.faveEvents.some((val) => val === input.eventId),
          "test result for like function"
        );

        const updatedEvent = await ctx.prisma.event.update({
          where: { id: input.eventId },
          data: {
            likeCount:
              ctx.session?.user?.faveEvents.some(
                (val) => val !== input.eventId
              ) || !ctx.session?.user?.faveEvents.length
                ? {
                    increment: 1,
                  }
                : { decrement: 1 },
          },
        });

        const updateFave = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user?.id,
          },
          data: {
            faveEvents:
              ctx.session?.user?.faveEvents.some(
                (val) => val !== input.eventId
              ) || !ctx.session?.user?.faveEvents.length
                ? {
                    push: input.eventId,
                  }
                : ctx.session?.user?.faveEvents.filter(
                    (item) => item !== input.eventId
                  ),
          },
        });
        // console.log(updateFave, "Updated users fave");
        return updatedEvent;
      } catch (err) {
        console.log(err, "An error occurred");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Faving of event went wrong",
        });
      }
    },
  })
  .query("getSingle", {
    input: singleEventInput,
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
      var events = await ctx.prisma.event.findMany({
        include: {
          tickets: true,
          creator: true,
        },
      });

      // if (ctx.session) {
      const newEvent = await Promise.all(
        events.map((event) => {
          // return {
          //   ...event,
          //   isFaved: ctx.session?.user?.faveEvents.some(
          //     (val) => val === event.id
          //   ),
          // };
          return Object.assign(event, {
            isFaved: ctx.session?.user?.faveEvents.some(
              (val) => val === event.id
            ),
          });
        })
      );

      return newEvent;
    },
  })
  .query("faves", {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot fetch faved events while logged out",
        });
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user?.id,
        },
        select: {
          faveEvents: true,
        },
      });

      const events = await ctx.prisma.event.findMany();

      const favedEvents = events.filter((event) =>
        user?.faveEvents.some((val) => val === event.id)
      );

      return favedEvents;
    },
  });
