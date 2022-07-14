import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      role: String;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    id: string;
  }
}

declare module "react-barcode" {
  export function Barcode();
}
