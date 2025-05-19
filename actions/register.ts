"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";

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
		console.log(existingUser);
		return { error: "Email is already taken" };
	}

	const user: typeof users.$inferInsert = {
		name,
		email,
		password: hashedPassword,
	};

	const res = await db.insert(users).values(user);
	console.log("New user created!", res);

	return { success: "Email Sent!" };
};
