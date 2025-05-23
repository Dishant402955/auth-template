import { ExtendedUser } from "@/next-auth";
import React from "react";
import { Card, CardHeader } from "../ui/card";

const UserInfo = ({ user, label }: { user?: ExtendedUser; label: string }) => {
	return (
		<Card className="w-[600px] mt-5">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">{label}</p>
			</CardHeader>{" "}
		</Card>
	);
};

export default UserInfo;
