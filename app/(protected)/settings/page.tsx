"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
const Settings = () => {
	const user = useCurrentUser();
	const handleSignOut = () => {
		signOut();
	};
	return (
		<div className="w-[600px] bg-neutral-950 mt-5 rounded-xl p-4 flex justify-center items-center">
			<Button variant={"secondary"} onClick={handleSignOut}>
				Sign Out
			</Button>
		</div>
	);
};

export default Settings;
