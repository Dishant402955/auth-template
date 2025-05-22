import { relations } from "drizzle-orm/relations";
import { user, account, session, twoFactorConfirmation } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	twoFactorConfirmations: many(twoFactorConfirmation),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const twoFactorConfirmationRelations = relations(twoFactorConfirmation, ({one}) => ({
	user: one(user, {
		fields: [twoFactorConfirmation.userId],
		references: [user.id]
	}),
}));