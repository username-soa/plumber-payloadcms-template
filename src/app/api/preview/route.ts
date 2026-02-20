import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Next.js Draft Mode so that page components know to fetch
 * draft (unpublished) content from Payload CMS.
 *
 * The Payload admin panel will call this endpoint when opening the
 * live preview iframe, appending the target page URL as the `url` param.
 *
 * Requires authentication via a secret token to prevent unauthorised
 * draft mode activation.
 */
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const secret = searchParams.get("secret");
	const url = searchParams.get("url");

	// Basic secret validation — uses the same PAYLOAD_SECRET
	if (secret !== process.env.PAYLOAD_SECRET) {
		return new Response("Invalid token", { status: 401 });
	}

	// Enable Next.js Draft Mode
	(await draftMode()).enable();

	// Redirect to the preview URL (the frontend page to preview)
	redirect(url || "/");
}
