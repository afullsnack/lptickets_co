import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createRouter } from "./context";

export const FiatPayInput = z.object({
  amount: z.string(),
});

export const payRouter = createRouter()
  .mutation("fiat", {
    input: FiatPayInput,
    // output: z.string().nullish(),
    async resolve({ ctx, input }) {
      // Check that user is logged in
      if (!ctx.session) {
        return new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot make payment while logged out",
        });
      }

      try {
        console.log("Fiat pay input", input);
        console.log("User session data", ctx.session?.user);

        // TODO: get data and make flutter eave API call
        const paymentJson = {
          tx_ref: nanoid(),
          amount: input.amount,
          currency: "USD",
          redirect_url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/api/trpc/pay"
              : "https://",
          // meta: {
          //     consumer_id: 23,
          //     consumer_mac: "92a3-912ba-1192a"
          // },
          customer: {
            email: ctx.session.user?.email,
            // phonenumber: "080****4528",
            name: ctx.session.user?.name,
          },
          customizations: {
            title: "LP TICKETS",
            description: "Make payment for ticket",
            // logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
          },
        };

        const response: {
          status: String;
          message: String;
          data: { link: String } | undefined | null;
        } = await fetch("", {
          //TODO: Add url
          method: "POST",
          body: JSON.stringify(paymentJson),
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRETE_KEY_TEST}`,
          },
        }).then((res) => res.json());
        // .then(
        //   (data) =>
        //     process.env.NODE_ENV === "development" &&
        //     console.log(data, "Payment return data")
        // );

        return response.status === "success" ? response.data?.link : null;
      } catch (err) {
        console.log(err, "Error making payment");
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error trying to make payment",
        });
      }

      // Instantiate and make call with FLW sdk to get link
      // const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY_TEST, process.env.FLW_SECRETE_KEY_TEST);
    },
  })
  .mutation("crypto", {
    /**
     * TODO: Add crypto payment gateway and handler
     */
    async resolve() {},
  })
  .query("fiat-callback", {
    // input: z.object({

    // }),
    async resolve({ ctx }) {
      const { status, tx_ref, transaction_id }: any | undefined =
        ctx.req?.query;
      console.log(status, tx_ref, transaction_id, "Callback return data");
      if (status === "successful") {
        const response: {
          status: String;
          message: String;
          data:
            | {
                tx_ref: String;
                amount: Number;
                currency: String;
                charged_amount: Number;
              }
            | undefined
            | null;
        } = await fetch(
          `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
          {
            // body: JSON.stringify(paymentJson),
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRETE_KEY_TEST}`,
            },
          }
        ).then((res) => res.json());
        console.log(
          response.status,
          response.message,
          response.data,
          "Verify response data"
        );
        if (
          response.status === "successful" &&
          response.data?.currency === "USD"
        ) {
          return response.data;
        } else {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Transaction verification failed",
          });
        }
      } else {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Transaction creation failed",
        });
      }
    },
  });
