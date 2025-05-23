import UserInfo from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth-lib";

const Server = async () => {
	const user = await currentUser();
	return <UserInfo label="🖥️ Server component" user={user} />;
};

export default Server;
