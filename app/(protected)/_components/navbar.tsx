"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="bg-neutral-100/10 p-4 flex justify-between items-center rounded-xl w-[600px] text-neutral-950">
			<div className="flex gap-x-3">
				<Button
					variant={pathname === "/server" ? "default" : "outline"}
					asChild
				>
					<Link href={"/server"}>Server</Link>
				</Button>
				<Button
					variant={pathname === "/client" ? "default" : "outline"}
					asChild
				>
					<Link href={"/client"}>Client</Link>
				</Button>
				<Button variant={pathname === "/admin" ? "default" : "outline"} asChild>
					<Link href={"/admin"}>Admin</Link>
				</Button>
				<Button
					variant={pathname === "/settings" ? "default" : "outline"}
					asChild
				>
					<Link href={"/settings"}>Settings</Link>
				</Button>
			</div>
			<UserButton />
		</nav>
	);
};

export default Navbar;
