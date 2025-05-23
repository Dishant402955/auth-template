import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { LoginSchema } from "./schemas";
import {
	db,
	getUserByEmail,
	getUserById,
	users,
	accounts,
	getTwoFactorByUserId,
} from "./lib/db";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { twoFactorConfirmation } from "./drizzle/schema";

export const {
	auth,
	handlers: { GET, POST },
	signIn,
	signOut,
} = NextAuth({
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
		error: "/autherror",
	},
	events: {
		async linkAccount({ user }) {
			if (user?.id) {
				await db
					.update(users)
					.set({ emailVerified: new Date() })
					.where(eq(users.id, user.id));
			}
		},
	},
	adapter: DrizzleAdapter(db, { usersTable: users, accountsTable: accounts }),
	providers: [
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);

					if (!user[0] || !user[0]?.password) {
						return null;
					}

					const isValidPassword = await bcrypt.compare(
						password,
						user[0].password
					);

					if (isValidPassword) {
						return user[0];
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") {
				return true;
			}

			const existingUser = await getUserById(user.id!);

			if (!existingUser[0].emailVerified) {
				return false;
			}

			if (existingUser[0].isTwoFactoredEnabled) {
				const tfa = await getTwoFactorByUserId(existingUser[0].id);

				if (!tfa) {
					console.log(tfa);
					return false;
				}

				await db
					.delete(twoFactorConfirmation)
					.where(eq(twoFactorConfirmation.userId, existingUser[0].id));
			}

			return true;
		},
		async session({ session, token }) {
			if (!token || !session.user) return session;

			session.user.id = token.sub as string;
			session.user.role = token.role as "ADMIN" | "USER";

			if (token.isTwoFactorEnabled) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as
					| boolean
					| null;
			}
			return session;
		},

		async jwt({ token }) {
			if (!token.sub) {
				return token;
			}

			const existingUser = await getUserById(token.sub!);

			if (!existingUser[0]) {
				return token;
			}

			token.role = existingUser[0].role;

			token.isTwoFactorEnabled = existingUser[0].isTwoFactoredEnabled;
			return token;
		},
	},
});
