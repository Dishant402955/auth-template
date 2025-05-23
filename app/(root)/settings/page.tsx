"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Settings = () => {
	const session = useSession();

	return (
		<>
			<Link href={"/"} className="absolute top-[10rem] left-8">
				<Button size={"lg"} variant={"secondary"}>
					Home
				</Button>
			</Link>
			<p className="font-semibold m-10 flex justify-center items-center h-[100%] text-white">
				{session.data?.user && JSON.stringify(session.data?.user)}
			</p>
		</>
	);
};

export default Settings;
