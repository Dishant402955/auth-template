import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Settings = async () => {
	const session = await auth();

	return (
		<>
			<Link href={"/"} className="absolute top-[10rem] left-8">
				<Button size={"lg"} variant={"secondary"}>
					Home
				</Button>
			</Link>
			<p className="font-semibold m-10 flex justify-center items-center h-[100%] text-white">
				{session && JSON.stringify(session.user)}
			</p>
		</>
	);
};

export default Settings;
