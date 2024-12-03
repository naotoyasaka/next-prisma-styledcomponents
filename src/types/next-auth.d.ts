import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string | null | undefined;
    name: string | null | undefined;
  }

  interface Session {
    user: User;
  }
}
