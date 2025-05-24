"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
	db,
	generateTwoFactorToken,
	generateVerificationToken,
	getTwoFactorByUserId,
	getTwoFactorTokenByEmail,
	getUserByEmail,
	twoFactorTokens,
} from "@/lib/db";
import { sendTwoFactorTokenMail, sendVerificationTokenMail } from "@/lib/mail";
import { eq } from "drizzle-orm";
import { twoFactorConfirmation } from "@/drizzle/schema";

export const login = async (
	values: z.infer<typeof LoginSchema>,
	callBackUrl: string | null
) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid Fields !" };
	}

	const { email, password, code } = validatedFields.data;

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

	if (existingUser[0].isTwoFactoredEnabled && existingUser[0].email) {
		if (code) {
			const token = (await getTwoFactorTokenByEmail(
				existingUser[0].email
			)) as any;

			if (!token) {
				return { error: "Invalid code!" };
			}

			if (token.token !== code) {
				return { error: "Invalid code!" };
			}

			const hasExpired = new Date(token.expires) < new Date();

			if (hasExpired) {
				return { error: "Code  expired!" };
			}

			await db.delete(twoFactorTokens).where(eq(token.id, twoFactorTokens.id));

			const existingtfc = await getTwoFactorByUserId(existingUser[0].id);

			if (existingtfc) {
				await db
					.delete(twoFactorConfirmation)
					.where(eq(twoFactorConfirmation.userId, existingtfc.userId));
			}
			await db
				.insert(twoFactorConfirmation)
				.values({ userId: existingUser[0].id });
		} else {
			const tfat = await generateTwoFactorToken(email);
			await sendTwoFactorTokenMail(existingUser[0].email, tfat?.token!);
			return { twoFactor: true };
		}
	}

	try {
		const res = await signIn("credentials", {
			email,
			password,
			redirect: true,
			redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
		});
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
