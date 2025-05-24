"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
	const user = useCurrentUser();
	const { update } = useSession();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactoredEnabled: user?.isTwoFactoredEnabled || undefined,
		},
	});

	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		startTransition(() => {
			settings(values)
				.then((data) => {
					setError("");
					setSuccess("");
					if (data.error) {
						setError(data.error);
					}

					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => {
					setError("Something Went Wrong!");
				});
		});
	};

	return (
		<Card className="w-[600px] mt-5">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">⚙️ Settings</p>
			</CardHeader>
			<CardContent className="px-16">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="John Doe"
												disabled={isPending}
												className="text-white"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{!user?.isOAuth ? (
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
														disabled={isPending}
														className="text-white"
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
														disabled={isPending}
														className="text-white"
														type="password"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="******"
														disabled={isPending}
														className="text-white"
														type="password"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							) : null}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<div>
													<SelectTrigger className="bg-neutral-800 text-white">
														<SelectValue placeholder="Select a Role" />
													</SelectTrigger>
													<SelectContent className="bg-neutral-800 text-white">
														<SelectItem value="ADMIN">Admin</SelectItem>
														<SelectItem value="USER">User</SelectItem>
													</SelectContent>
												</div>
											</FormControl>
											<FormMessage />
										</Select>
									</FormItem>
								)}
							/>
							{!user?.isOAuth ? (
								<FormField
									control={form.control}
									name="isTwoFactoredEnabled"
									render={({ field }) => (
										<FormItem className="flex justify-between items-center rounded-lg border p-3 shadow-sm bg-neutral-700 text-white">
											<div className="space-y-0.5">
												<FormLabel>Two Factor Authentication</FormLabel>
												<FormDescription>
													Enable Two Factor Authentication for your account
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													disabled={isPending}
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							) : null}
						</div>
						<FormSuccess message={success} />
						<FormError message={error} />
						<Button type="submit" disabled={isPending}>
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default Settings;
