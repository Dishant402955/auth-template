"use client";

import { CardWrapper } from "./card-wrapper";
import { ScaleLoader as Loader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/verificationToken";

const NewVerificationForm = () => {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const token = searchParams.get("token");

	const onSubmit = useCallback(async () => {
		if (!token) {
			setError("Verification Token Does not Exists.");
		}
		const res = await newVerification(token!);
		setSuccess(res.success);
		setError(res.error);
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [token]);

	return (
		<CardWrapper
			headerLabel="Confirming your Verification ..."
			backButtonLabel="Back to Login"
			backButtonHref="/login"
			showSocial={false}
		>
			{!error && !success ? (
				<div className="flex justify-center items-center w-full my-4">
					<Loader />
				</div>
			) : null}

			{error ? <p>{error}</p> : null}
			{success ? <p>{success}</p> : null}
		</CardWrapper>
	);
};

export default NewVerificationForm;
