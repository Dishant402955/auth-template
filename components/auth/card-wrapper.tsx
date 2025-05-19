"use client";

import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "./back-button";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial: boolean;
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	const router = useRouter();
	const onClick = () => {
		router.push(`${backButtonHref}`);
	};

	return (
		<Card className="w-[400px] shadow-medium bg-emerald-100/100 shadow-2xl shadow-emerald-900">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>

			<CardContent className="flex justify-center items-center w-full">
				{children}
			</CardContent>

			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter className="flex justify-center items-center">
				<BackButton
					href={backButtonHref}
					label={backButtonLabel}
				/>
			</CardFooter>
		</Card>
	);
};
