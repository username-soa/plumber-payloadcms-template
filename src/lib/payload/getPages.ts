import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { Page } from "@/payload-types";

/**
 * Fetches a single page by slug from the Payload CMS.
 *
 * Wrapped with React.cache() so that multiple callers within the same
 * request/render (e.g. generateMetadata + the Page component) share a
 * single database round-trip instead of each making their own.
 */
export const getPageBySlug = cache(
	async (slug: string, draft = false): Promise<Page | null> => {
		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "pages",
			where: draft
				? { slug: { equals: slug } }
				: { slug: { equals: slug }, status: { equals: "published" } },
			draft,
			limit: 1,
			depth: 3,
		});

		return result.docs[0] ?? null;
	},
);

/**
 * Returns all published page slugs — used by generateStaticParams.
 * Not wrapped with cache() since it runs at build time in a different context.
 */
export async function getAllPageSlugs(): Promise<string[]> {
	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "pages",
		where: { status: { equals: "published" } },
		limit: 1000,
		depth: 0,
	});

	return result.docs.map((doc) => doc.slug).filter(Boolean) as string[];
}
