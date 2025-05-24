"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";

import { generatePasswordResetToken, getUserByEmail } from "@/lib/db";
import { sendPasswordResetTokenMail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid Fields !" };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser[0] || !existingUser[0]?.email) {
		return { error: "Email does not exist !" };
	}

	const verificationToken = await generatePasswordResetToken(email);

	await sendPasswordResetTokenMail(email, verificationToken?.token!);
	return { success: "Reset Link Sent!" };
};
