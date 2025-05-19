import { CardWrapper } from "./card-wrapper";

export const RegisterForm = () => {
	return (
		<CardWrapper
			headerLabel="Welcome Back"
			backButtonHref="/login"
			backButtonLabel="Already Have an Account ?"
			showSocial={true}
		>
			<h1>Register Form</h1>
		</CardWrapper>
	);
};
