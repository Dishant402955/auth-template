"use client";

import { AdminOnlyStuff } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

const Admin = () => {
	const onApiRouteClick = () => {
		fetch("/api/admin").then((response) => {
			if (response.ok) {
				toast.success("Allowed API Route");
			} else {
				toast.error("Forbidden API Route");
			}
		});
	};

	const onServerActionClick = async () => {
		AdminOnlyStuff().then((data) => {
			if (data.success) {
				toast.success(data.success);
			} else {
				toast.error(data.error);
			}
		});
	};

	return (
		<Card className="w-[600px] mt-5">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">⚒️ Admin</p>
			</CardHeader>
			<CardContent>
				<RoleGate allowedRole={"ADMIN"}>
					<FormSuccess message="You are Allowed to see this content" />
				</RoleGate>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API Route</p>
					<Button onClick={onApiRouteClick}>Click to Test</Button>
				</div>
				<div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button onClick={onServerActionClick}>Click to Test</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default Admin;
