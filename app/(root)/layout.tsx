import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import Navbar from "./navbar";

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
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-radial from-emerald-100 to-emerald-800">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
