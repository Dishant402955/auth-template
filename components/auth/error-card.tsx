import Header from "./header";
import { Card, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import { CardWrapper } from "./card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Oops! Something went Wrong!"
			backButtonLabel="Back to login"
			backButtonHref="/login"
			showSocial={false}
		>
			<div>
				<BsExclamationTriangle className="text-destructive" />
			</div>
		</CardWrapper>
	);
};

export default ErrorCard;
