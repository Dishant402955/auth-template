"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const UserProfile = ({ session }: any) => {
	const onClick = () => {
		signOut();
	};
	return (
		<div className="flex flex-col p-4 gap-y-6">
			<p className="text-3xl font-semibold">hello👋 {session.user?.email}</p>

			<Button type="submit" variant={"secondary"} onClick={onClick}>
				Sign Out
			</Button>
		</div>
	);
};

export default UserProfile;
