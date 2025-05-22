"use client";

import { CardWrapper } from "./card-wrapper";
import { ScaleLoader as Loader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/verificationToken";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const token = searchParams.get("token");

	const onSubmit = useCallback(async () => {
		if (success || error) {
			return;
		}
		if (!token) {
			setError("Verification Token Does not Exist.");
		}
		const res = await newVerification(token!);
		setSuccess(res.success);
		setError(res.error);
	}, [token, success, error]);

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
			<div className="flex justify-center items-center  my-4 w-[85%]">
				{!error && !success ? <Loader /> : null}
				{!success && <FormError message={error} />}
				{!error && <FormSuccess message={success} />}
			</div>
		</CardWrapper>
	);
};

export default NewVerificationForm;
