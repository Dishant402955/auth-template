"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
	const onClick = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="w-full flex flex-col items-center gap-x-4">
			<p className="text-emerald-800 mb-3">or</p>
			<Button
				className="w-[90%] my-1"
				size={"lg"}
				variant={"custom"}
				onClick={() => onClick("google")}
			>
				<FaGoogle color="000000" />
			</Button>
			<Button
				className="w-[90%] my-1"
				size={"lg"}
				variant={"custom"}
				onClick={() => onClick("github")}
			>
				<FaGithub color="000000" />
			</Button>
		</div>
	);
};

export default Social;
