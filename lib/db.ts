import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DB_URI!);

import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }),
});

async function main() {
	const user: typeof usersTable.$inferInsert = {
		name: "John",
		email: "john@example.com",
		password: "123456",
	};

	await db.insert(usersTable).values(user);
	console.log("New user created!");

	const users = await db.select().from(usersTable);
	console.log("Getting all users from the database: ", users);
}
