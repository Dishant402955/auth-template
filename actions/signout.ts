"use server";

import { signOut } from "@/auth";

export const signOutHelper = async () => {
	await signOut();
};
