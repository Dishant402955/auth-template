import * as z from "zod";

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),
});

export const SettingsSchema = z
	.object({
		name: z.optional(
			z.string().min(1, { message: "Min 1 Character required!" })
		),
		isTwoFactoredEnabled: z.optional(z.boolean()),
		role: z.enum(["ADMIN", "USER"]),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (data?.password && !data?.newPassword) {
				return false;
			}

			return true;
		},
		{
			message: "New Password is required!",
			path: ["newPassword"],
		}
	)
	.refine(
		(data) => {
			if (data?.newPassword && !data?.password) {
				return false;
			}

			return true;
		},
		{
			message: "Password is required!",
			path: ["password"],
		}
	);

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
