/**
 * GET /api/search?q=<query>
 *
 * Queries the Payload `search` collection (populated by @payloadcms/plugin-search)
 * and returns a normalised list of matching results with their URL, title, excerpt,
 * and collection type.
 *
 * Query parameters:
 * @param q - The search string (minimum 2 characters)
 *
 * Response shape:
 * { results: Array<{ id, title, excerpt, type, url }> }
 */

import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Constants — defined at module scope so they are not rebuilt per request
// ---------------------------------------------------------------------------

/** The Payload collection slug added by @payloadcms/plugin-search */
const SEARCH_COLLECTION = "search" as const;

/**
 * Maps a collection slug to its canonical URL prefix.
 * FAQs are a single page so they don't use a slug segment.
 */
const URL_MAP: Record<string, string> = {
	"blog-posts": "/blog",
	"case-studies": "/case-studies",
	services: "/services",
	faqs: "/faqs",
} as const;

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const query = searchParams.get("q")?.trim();

	// Reject empty or too-short queries early — no DB round-trip needed
	if (!query || query.length < 2) {
		return NextResponse.json({ results: [] });
	}

	try {
		const payload = await getPayload({ config });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await (payload.find as any)({
			collection: SEARCH_COLLECTION,
			where: {
				// Search both title and excerpt fields
				or: [
					{ title: { like: query } },
					{ excerpt: { like: query } },
				],
			},
			limit: 10,
			// depth: 1 populates the related source document so we can read its
			// slug even for records that were indexed before the slug field was added
			depth: 1,
		});

		// Normalise each document into a clean, typed shape for the client
		const results = result.docs.map((doc: Record<string, unknown>) => {
			// `doc.doc` is now a populated relationship: { relationTo, value: { slug, ... } }
			const docRef = doc.doc as { relationTo?: string; value?: Record<string, unknown> } | undefined;
			const collectionSlug = docRef?.relationTo;
			// Prefer the top-level slug field (set by beforeSync); fall back to the
			// populated source document's slug for pre-reindex records
			const slug =
				(doc.slug as string | undefined) ||
				(docRef?.value?.slug as string | undefined) ||
				"";

			// Build the URL: use the known prefix map, or fall back to `/<slug>`
			const urlPrefix = collectionSlug ? (URL_MAP[collectionSlug] ?? "") : "";
			const url = collectionSlug === "faqs" ? urlPrefix : `${urlPrefix}/${slug}`;

			return {
				id: doc.id,
				title: (doc.title as string | undefined) ?? "",
				excerpt: (doc.excerpt as string | undefined) ?? "",
				type: collectionSlug ?? "unknown",
				url,
			};
		});

		return NextResponse.json({ results });
	} catch (error) {
		console.error("[Search API] Error:", error);
		return NextResponse.json(
			{ error: "Search failed", results: [] },
			{ status: 500 },
		);
	}
}
