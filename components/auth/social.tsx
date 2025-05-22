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
			<p className="text-white mb-3">or</p>
			<Button
				className="w-[90%] my-1"
				onClick={() => onClick("google")}
				variant={"secondary"}
			>
				<FaGoogle color="000000" />
			</Button>
			<Button
				className="w-[90%] my-1"
				onClick={() => onClick("github")}
				variant={"secondary"}
			>
				<FaGithub color="000000" />
			</Button>
		</div>
	);
};

export default Social;
