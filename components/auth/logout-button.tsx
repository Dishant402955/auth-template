"use client";

import { signOut } from "next-auth/react";
import React from "react";

export const LogOutButton = ({ children }: { children: React.ReactNode }) => {
	const onClick = () => {
		signOut();
	};

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
