import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: "passwoord is required",
	}),
});

export const RegisterSchema = z.object({
	email: z.string().email(),
	username: z.string().max(20),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});
