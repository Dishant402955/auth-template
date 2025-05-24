"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email Already in use with different Provider"
			: "";
	const callBackUrl = searchParams.get("callbackUrl");
	const [isPending, startTransition] = useTransition();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			setError("");
			setSuccess("");

			login(values, callBackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data?.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data?.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => {
					setError("Something Went Wrong!");
				});
		});
	};

	return (
		<CardWrapper
			headerLabel={!showTwoFactor ? "Welcome Back" : "Confirm Yourself"}
			backButtonHref={!showTwoFactor ? "/register" : ""}
			backButtonLabel={!showTwoFactor ? "Don't Have an Account ?" : ""}
			showSocial={!showTwoFactor}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 w-[90%]"
				>
					<div className="space-y-4">
						{!showTwoFactor ? (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="john@doe.com"
													className="w-full"
													type="email"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="******"
													className="w-full"
													type="password"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
											<Button
												size={"sm"}
												variant={"link"}
												className="relative -left-25 -top-2 text-neutral-50/50"
											>
												<Link href={"/reset"}>Forgot Password?</Link>
											</Button>
										</FormItem>
									)}
								/>
							</>
						) : (
							<>
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Two Factor Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="********"
													className="w-full"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
						variant={"secondary"}
					>
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
