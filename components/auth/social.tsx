"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Social = () => {
	return (
		<div className="w-full flex flex-col items-center gap-x-4">
			<p className="text-emerald-800 mb-3">or</p>
			<Button
				className="w-[90%] my-1"
				size={"lg"}
				variant={"custom"}
				onClick={() => {}}
			>
				<FaGoogle color="000000" />
			</Button>
			<Button
				className="w-[90%] my-1"
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
