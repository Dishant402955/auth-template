"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken, getUserByEmail } from "@/lib/db";
import sendVerificationTokenMail from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid Fields !" };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser[0] || !existingUser[0]?.email) {
		return { error: "Email does not exist !" };
	}

	if (!existingUser[0]?.password) {
		return { error: "Please try using valid Provider !" };
	}

	if (!existingUser[0].emailVerified) {
		const verification_token = await generateVerificationToken(
			existingUser[0].email
		);

		await sendVerificationTokenMail(email, verification_token?.token!);
		return { success: "Verification Email Sent !" };
	}

	try {
		console.log("Done");
		const res = await signIn("credentials", {
			email,
			password,
			redirect: true,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
		console.log("DDone", res);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials" };
				default:
					return { error: "Something went Wrong" };
			}
		}

		throw error;
	}
};
