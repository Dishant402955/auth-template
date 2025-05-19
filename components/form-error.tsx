import { BsExclamationTriangle } from "react-icons/bs";

interface FromErrorProps {
	message: string;
}

export const FormError = ({
	message,
}: FromErrorProps) => {
	if (!message) return null;

	return (
		<div className="w-full bg-red-200 text-red-900 flex p-2 gap-x-3 justify-center items-center rounded-sm">
			<BsExclamationTriangle />
			<p>{message}</p>
		</div>
	);
};
