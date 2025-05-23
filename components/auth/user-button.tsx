"use client";

import { BsPerson } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOutButton } from "./logout-button";

export const UserButton = () => {
	const user = useCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="cursor-pointer">
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback>
						<BsPerson />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-30" align="end">
				<LogOutButton>
					<DropdownMenuItem className="flex gap-x-2 items-center cursor-pointer">
						<IoExitOutline color="#000000" />
						Sign Out
					</DropdownMenuItem>
				</LogOutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
