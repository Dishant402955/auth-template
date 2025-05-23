import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
	role: "ADMIN" | "USER";
	isTwoFactorEnabled: boolean | null;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
