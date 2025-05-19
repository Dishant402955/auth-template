import { BsCheckCircle } from "react-icons/bs";

interface FromSuccessProps {
	message: string;
}

export const FormSuccess = ({
	message,
}: FromSuccessProps) => {
	if (!message) return null;

	return (
		<div className="w-full bg-green-200 text-green-900 flex p-2 gap-x-3 justify-center items-center rounded-sm">
			<BsCheckCircle />
			<p>{message}</p>
		</div>
	);
};
