import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";

import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	varchar,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";

export const db = drizzle(process.env.DB_URI!);

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	password: text("password"),
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

// async function main() {
// 	const user: typeof usersTable.$inferInsert = {
// 		name: "John",
// 		email: "john@example.com",
// 		password: "123456",
// 	};

// 	await db.insert(usersTable).values(user);
// 	console.log("New user created!");

// 	const users = await db.select().from(usersTable);
// 	console.log("Getting all users from the database: ", users);
// }
