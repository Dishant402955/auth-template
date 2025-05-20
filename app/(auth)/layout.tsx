import React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Authentication Pages",
	description:
		"This are the authentication pages which includes login, register, ...",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-radial from-emerald-100 to-emerald-800">
				<Link href={"/"} className="absolute left-8 top-6">
					<Button size={"lg"}>Home</Button>
				</Link>
				<div className={"flex h-full justify-center items-center"}>
					{children}
				</div>
			</body>
		</html>
	);
};

export default AuthLayout;
