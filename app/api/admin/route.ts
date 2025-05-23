import { NextResponse } from "next/server";
import { currentRole } from "@/lib/auth-lib";

export async function GET() {
	const role = await currentRole();

	if (role === "ADMIN") {
		return new NextResponse(null, { status: 200 });
	}

	return new NextResponse(null, { status: 403 });
}
