import { eq } from "drizzle-orm";

import { drizzle } from "drizzle-orm/neon-http";

import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	varchar,
	pgEnum,
} from "drizzle-orm/pg-core";

import { AdapterAccountType } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";

export const db = drizzle(process.env.DB_URI!);

export const userRoleEnum = pgEnum("role", ["ADMIN", "USER"]);

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	password: text("password"),
	role: userRoleEnum("role").default("USER"),
	isTwoFactoredEnabled: boolean("is_two_factored_enabled").default(false),
});

export const TwoFactorConfirmation = pgTable("twoFactorConfirmation", {
	id: text("id").$defaultFn(() => crypto.randomUUID()),
	userId: text("userId")
		.primaryKey()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId],
			}),
		},
	]
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verification_token",
	{
		id: text("id")
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		email: text("email"),
		token: text("token").notNull().unique(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundPk: primaryKey({ columns: [vt.email, vt.token] }),
	})
);

export const passwordResetTokens = pgTable(
	"password_reset_token",
	{
		id: text("id")
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		email: text("email"),
		token: text("token").notNull().unique(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundPk: primaryKey({ columns: [vt.email, vt.token] }),
	})
);

export const twoFactorTokens = pgTable(
	"two_factor_token",
	{
		id: text("id")
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		email: text("email"),
		token: text("token").notNull().unique(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundPk: primaryKey({ columns: [vt.email, vt.token] }),
	})
);

export async function getUserByEmail(email: string) {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	return user;
}

export async function getUserById(id: string) {
	const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

	return user;
}

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const token = await db
			.select()
			.from(verificationTokens)
			.where(eq(verificationTokens.email, email));

		return token[0];
	} catch (error) {}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const res = await db
			.select()
			.from(verificationTokens)
			.where(eq(verificationTokens.token, token));

		return res[0];
	} catch (error) {}
};

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);
	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.id, existingToken.id));
	}

	await db.insert(verificationTokens).values({
		email,
		token,
		expires,
	});

	const verification_token = await getVerificationTokenByEmail(email);

	return verification_token;
};

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const token = await db
			.select()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.email, email));

		return token[0];
	} catch (error) {}
};

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const res = await db
			.select()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.token, token));

		return res[0];
	} catch (error) {}
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);
	const existingToken = await getPasswordResetTokenByEmail(email);

	if (existingToken) {
		await db
			.delete(passwordResetTokens)
			.where(eq(passwordResetTokens.id, existingToken.id));
	}

	await db.insert(passwordResetTokens).values({
		email,
		token,
		expires,
	});

	const verification_token = await getPasswordResetTokenByEmail(email);

	return verification_token;
};
