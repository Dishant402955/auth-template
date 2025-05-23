"use client";

import UserInfo from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const Client = () => {
	const user = useCurrentUser();
	return <UserInfo label="👨‍💻 Client component" user={user} />;
};

export default Client;
