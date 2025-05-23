"use client";

import UserProfile from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
	const user = useCurrentUser();

	return (
		<div className="absolute left-8 top-6 shadow-2xl bg-white/20 rounded-2xl text-white">
			{!user && (
				<LoginButton mode={"redirect"}>
					<Button variant={"secondary"} size={"lg"} className={"m-2"}>
						Sign In
					</Button>
				</LoginButton>
			)}

			{user && <UserProfile user={user} />}
		</div>
	);
};

export default Navbar;
