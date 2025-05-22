import UserProfile from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { auth } from "@/auth";

const Navbar = async () => {
	const session = await auth();

	return (
		<div className="absolute left-8 top-6 shadow-2xl bg-white/20 rounded-2xl text-white">
			{!session && (
				<LoginButton mode={"redirect"}>
					<Button variant={"secondary"} size={"lg"} className={"m-2"}>
						Sign In
					</Button>
				</LoginButton>
			)}

			{session && <UserProfile session={session} />}
		</div>
	);
};

export default Navbar;
