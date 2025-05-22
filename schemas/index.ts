import * as z from "zod";

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),
});

export const ResetSchema = z.object({
	email: z.string().email(),
});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: "password is required",
	}),
	code: z.optional(z.string().length(8, { message: "Enter a 8 digit Code" })),
});

export const RegisterSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),
	name: z.string().min(1, {
		message: "name is required",
	}),
});
