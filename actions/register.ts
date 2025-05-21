"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db, users, verificationTokens } from "@/lib/db";
import { eq } from "drizzle-orm";
import { generateVerificationToken } from "@/lib/db";
import sendVerificationTokenMail from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid Fields!" };
	}

	const { email, name, password } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await db
		.select()
		.from(users)
		.where(eq(users.email, email));

	if (existingUser[0]) {
		return { error: "Email is already taken" };
	}

	const user: typeof users.$inferInsert = {
		name,
		email,
		password: hashedPassword,
		role: "USER",
	};

	const res = await db.insert(users).values(user);

	const verificationToken = await generateVerificationToken(email);

	await sendVerificationTokenMail(email, verificationToken?.token!);

	return { success: "Verification Email Sent!" };
};
