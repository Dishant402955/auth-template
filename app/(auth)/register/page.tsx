import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

const Register = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<RegisterForm />;
		</Suspense>
	);
};

export default Register;
