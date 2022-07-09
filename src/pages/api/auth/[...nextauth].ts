import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email address"
        }
      },
      async authorize(credentials, _req) {
        const user = { name: credentials?.name ?? "J Smith", email: credentials?.email ?? "example@lp.com" };
        console.info(user, "signed in users info");
        //TODO: Call endpoint to create user and pass object to be stored in db
        return user;
      },
    }),
  ],
  // callbacks: {
  // }
};

export default NextAuth(authOptions);
