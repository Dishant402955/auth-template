import React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "./_components/navbar";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Protected Pages",
	description: "This are the Protected pages which requires login",
};

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="en" suppressHydrationWarning>
				<body className="bg-neutral-900 text-white flex flex-col h-full justify-center items-center">
					<Link href={"/"} className="absolute left-8 top-5">
						<Button size={"lg"} variant={"secondary"}>
							Home
						</Button>
					</Link>

					<Navbar />
					{children}
				</body>
			</html>
		</SessionProvider>
	);
};

export default ProtectedLayout;
