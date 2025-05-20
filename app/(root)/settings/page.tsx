"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Settings = () => {
	return (
		<>
			<Link href={"/"} className="absolute left-[26rem] top-7">
				<Button size={"lg"}>Home</Button>
			</Link>
			<p className="text-5xl font-semibold m-10 flex justify-center items-center h-[100%]">
				Settings Page
			</p>
		</>
	);
};

export default Settings;
