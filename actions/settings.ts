"use server";

import * as z from "zod";
import { currentUser } from "@/lib/auth-lib";
import { SettingsSchema } from "@/schemas";
import {
	db,
	generateVerificationToken,
	getUserByEmail,
	getUserById,
	users,
} from "@/lib/db";
import { eq } from "drizzle-orm";
import { sendVerificationTokenMail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();

	if (!user) {
		return { error: "Unauthorized!" };
	}

	const dbUser = await getUserById(user.id!);

	if (!dbUser[0]) {
		return { error: "Unauthorized!" };
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactoredEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser[0] && existingUser[0].id !== user.id) {
			return { error: "Email already in use!" };
		}

		const token = await generateVerificationToken(values.email);

		await sendVerificationTokenMail(token?.email!, token?.token!);

		return { success: "Verification Email Sent!" };
	}

	console.log(values);
	if (values.password && values.newPassword && dbUser[0].password) {
		const passwordMatch = await bcrypt.compare(
			values.password,
			dbUser[0].password
		);

		if (!passwordMatch) {
			return { error: "Incorrect Password!" };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db
		.update(users)
		.set({ ...values })
		.where(eq(dbUser[0].id as any, users.id));

	return { success: "Settings Updated!" };
};
