"use server";

import { currentRole } from "@/lib/auth-lib";

export const AdminOnlyStuff = async () => {
	const role = await currentRole();

	if (role === "ADMIN") {
		return { success: "Allowed Server Action" };
	}

	return { error: "Forbidden Server Action" };
};
