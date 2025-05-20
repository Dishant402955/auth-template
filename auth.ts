import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./lib/db";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
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
});
