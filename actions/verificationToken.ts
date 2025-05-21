"use server";

import {
	db,
	getUserByEmail,
	getVerificationTokenByToken,
	users,
	verificationTokens,
} from "@/lib/db";
import { eq } from "drizzle-orm";

export const newVerification = async (token: string) => {
	const existingToken = (await getVerificationTokenByToken(token)) as any;

	if (!existingToken) {
		return { error: "Token does not exist!" };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has Expired!" };
	}

	const existingUser = (await getUserByEmail(existingToken.email!)) as any;

	if (!existingUser[0]) {
		return { error: "Email does not exist!" };
	}

	await db
		.update(users)
		.set({ emailVerified: new Date(), email: existingToken.email })
		.where(eq(existingUser[0].id, users.id));

	await db
		.delete(verificationTokens)
		.where(eq(existingToken.id, verificationTokens.id));

	return { success: "Email Verified!" };
};
