import { BsExclamationTriangle } from "react-icons/bs";

interface FromErrorProps {
	message: string | undefined;
}

export const FormError = ({ message }: FromErrorProps) => {
	if (!message) return null;

	return (
		<div className="w-full text-sm bg-destructive/15 text-destructive flex p-2 gap-x-3 justify-center items-center rounded-sm">
			<BsExclamationTriangle />
			<p>{message}</p>
		</div>
	);
};
