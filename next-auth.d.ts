import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's ID. */
      id: string;
      /** The user's role. */
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    /** The user's ID. */
    id: string;
    /** The user's role. */
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's ID. */
    id: string;
    /** The user's role. */
    role?: string;
  }
}
