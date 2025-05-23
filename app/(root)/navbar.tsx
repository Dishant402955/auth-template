"use client";

import UserProfile from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
	const user = useCurrentUser();

	return (
		<div className=" absolute top-4 left-6 ">
			{!user && (
				<LoginButton mode={"redirect"}>
					<Button variant={"secondary"} size={"lg"} className={"m-2"}>
						Sign In
					</Button>
				</LoginButton>
			)}

			{user && <UserButton />}
		</div>
	);
};

export default Navbar;
