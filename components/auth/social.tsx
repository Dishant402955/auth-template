"use client";

import { FcGoogle } from "react-icons/fc";
import {
	FaGithub,
	FaGoogle,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Social = () => {
	return (
		<div className="w-full flex flex-col items-center gap-x-4">
			<Button
				className="w-[90%] my-2"
				size={"lg"}
				variant={"custom"}
				onClick={() => {}}
			>
				<FaGoogle color="000000" />
			</Button>

			<Button
				className="w-[90%] my-2"
				size={"lg"}
				variant={"custom"}
				onClick={() => {}}
			>
				<FaGithub color="000000" />
			</Button>
		</div>
	);
};

export default Social;
