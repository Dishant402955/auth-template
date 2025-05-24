import { auth } from "@/auth";
import {
	apiAuthPrefix,
	publicRoutes,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthPrefix) {
		return;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callBackUrl = nextUrl.pathname;

		if (nextUrl.search) {
			callBackUrl += nextUrl.search;
		}

		const encodedCallBackUrl = encodeURIComponent(callBackUrl);

		return Response.redirect(
			new URL(`/login?callbackUrl=${encodedCallBackUrl}`, nextUrl)
		);
	}

	return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};
