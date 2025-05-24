import { ExtendedUser } from "@/next-auth";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

const UserInfo = ({ user, label }: { user?: ExtendedUser; label: string }) => {
	return (
		<Card className="w-[600px] mt-5">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">{label}</p>
			</CardHeader>{" "}
			<CardContent className="space-y-2">
				<div className="flex items-center justify-between rounded-lg border py-1 shadow-sm px-10">
					<p className="text-sm font-medium">ID</p>
					<p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.id}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border py-1 shadow-sm px-10">
					<p className="text-sm font-medium">Name</p>
					<p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.name}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border py-1 shadow-sm px-10">
					<p className="text-sm font-medium">Email</p>
					<p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.email}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border py-1 shadow-sm px-10">
					<p className="text-sm font-medium">Role</p>
					<p className="truncate text-xs max-w-[160px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.role}
					</p>
				</div>
				<div className="flex items-center justify-between rounded-lg border py-1 shadow-sm px-10">
					<p className="text-sm font-medium">Two Factor Authentication</p>
					<p
						className={`truncate text-xs max-w-[160px] font-mono p-1 ${
							user?.isTwoFactoredEnabled
								? "bg-emerald-400"
								: "bg-destructive text-white"
						} rounded-md`}
					>
						{user?.isTwoFactoredEnabled ? "ON" : "OFF"}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserInfo;
