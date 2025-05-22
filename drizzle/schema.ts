import { pgTable, foreignKey, text, integer, unique, timestamp, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['ADMIN', 'USER'])


export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
	password: text(),
	role: role().default('USER'),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const twoFactorConfirmation = pgTable("twoFactorConfirmation", {
	id: text(),
	userId: text().primaryKey().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "constraint_1"
		}).onDelete("cascade"),
]);

export const passwordResetToken = pgTable("password_reset_token", {
	id: text().notNull(),
	email: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.email, table.token], name: "password_reset_token_email_token_pk"}),
	unique("password_reset_token_token_unique").on(table.token),
]);

export const verificationToken = pgTable("verification_token", {
	id: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
	email: text().notNull(),
}, (table) => [
	primaryKey({ columns: [table.token, table.email], name: "verification_token_email_token_pk"}),
	unique("verification_token_token_unique").on(table.token),
]);
