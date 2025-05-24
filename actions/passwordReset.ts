"use server";

import {
	db,
	getPasswordResetTokenByToken,
	getUserByEmail,
	passwordResetTokens,
	users,
} from "@/lib/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const newPassword = async (
	{ password }: { password: string },
	token: string
) => {
	const existingToken = (await getPasswordResetTokenByToken(token)) as any;

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

	const hashedPassword = await bcrypt.hash(password, 10);

	await db
		.update(users)
		.set({ password: hashedPassword })
		.where(eq(existingUser[0].id, users.id));

	await db
		.delete(passwordResetTokens)
		.where(eq(existingToken.id, passwordResetTokens.id));

	return { success: "Password Reset!" };
};
