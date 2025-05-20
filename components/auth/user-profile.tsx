"use client";

import { Button } from "../ui/button";

const UserProfile = ({ session }: any) => {
	return (
		<>
			<p className="text-3xl font-semibold mt-16">
				hello👋 {session.user?.email}
			</p>
			{/* <Button onClick={}>Sign Out</Button> */}
		</>
	);
};

export default UserProfile;
