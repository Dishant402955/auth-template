import React from "react";

interface HeaderProps {
	label: string;
}

const Header = ({ label }: HeaderProps) => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<h1 className="text-2xl font-semibold">
				🔐Auth
			</h1>
			<p className="text-muted-foreground text-xl font-semibold">
				{label}
			</p>
		</div>
	);
};

export default Header;
