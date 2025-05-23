"use client";

import { LogOutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

const Settings = () => {
	return (
		<div className="w-[600px] bg-neutral-100 mt-5 rounded-xl p-4 flex justify-center items-center">
			<LogOutButton>
				<Button>Sign Out</Button>
			</LogOutButton>
		</div>
	);
};

export default Settings;
