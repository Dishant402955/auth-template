import { signOut } from "@/auth";
import { Button } from "../ui/button";

const UserProfile = ({ session }: any) => {
	return (
		<div className="flex flex-col p-4 gap-y-6">
			<p className="text-3xl font-semibold">hello👋 {session.user?.email}</p>
			<form
				action={async () => {
					"use server";

					await signOut();
				}}
			>
				<Button type="submit" variant={"secondary"}>
					Sign Out
				</Button>
			</form>
		</div>
	);
};

export default UserProfile;
