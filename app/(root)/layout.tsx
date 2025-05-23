import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import Navbar from "./navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
	title: "Auth.js Template",
	description:
		"An Authentication Template with OAuth, 2 Factor Authentication, Role-Based Access and much more ...",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="en" suppressHydrationWarning>
				<body className="bg-neutral-900">
					<Navbar />
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
