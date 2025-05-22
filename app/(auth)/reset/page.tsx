import { ResetForm } from "@/components/auth/reset-form";
import { Suspense } from "react";
const Reset = () => {
	return (
		<Suspense fallback={<p>Looading...</p>}>
			<ResetForm />;
		</Suspense>
	);
};

export default Reset;
