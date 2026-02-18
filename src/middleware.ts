import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Edge Middleware for Payload CMS Redirects.
 *
 * Checks the Payload `redirects` collection (via REST API) for a matching
 * `from` path on every incoming request. If found, issues the appropriate
 * HTTP redirect (301 or 302). Otherwise, passes the request through.
 *
 * Note: Edge middleware cannot use `getPayload()` directly, so we call
 * the Payload REST API instead.
 */
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip Payload admin routes, API routes, and static assets
	if (
		pathname.startsWith("/admin") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	try {
		const serverUrl =
			process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

		// Query the Payload redirects collection for a matching 'from' path
		const res = await fetch(
			`${serverUrl}/api/redirects?where[from][equals]=${encodeURIComponent(pathname)}&limit=1`,
			{
				// Use no-store to always get fresh redirect data
				cache: "no-store",
			},
		);

		if (!res.ok) {
			return NextResponse.next();
		}

		const data = await res.json();
		const redirect = data?.docs?.[0];

		if (!redirect) {
			return NextResponse.next();
		}

		// Resolve the destination URL
		let destination: string;

		if (redirect.to?.url) {
			// External URL redirect
			destination = redirect.to.url;
		} else if (redirect.to?.reference?.value?.slug) {
			// Internal document reference — build the URL from the slug
			const { relationTo, value } = redirect.to.reference;
			const slug = value.slug;

			const pathMap: Record<string, string> = {
				pages: `/${slug}`,
				"blog-posts": `/blog/${slug}`,
				"case-studies": `/case-studies/${slug}`,
				services: `/services/${slug}`,
			};

			destination = pathMap[relationTo] ?? `/${slug}`;
		} else {
			return NextResponse.next();
		}

		const statusCode = redirect.type === "302" ? 302 : 301;
		const redirectUrl = new URL(destination, request.url);

		return NextResponse.redirect(redirectUrl, { status: statusCode });
	} catch {
		// If the redirect lookup fails for any reason, continue normally
		return NextResponse.next();
	}
}

export const config = {
	// Run on all routes except static files and Payload internals
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|admin|api).*)",
	],
};
