import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { CaseStudy } from "@/payload-types";

/**
 * Fetches a single case study by slug.
 * Wrapped with React.cache() to deduplicate within a render pass
 * (e.g. generateMetadata + CaseStudyPage share one DB hit).
 */
export const getCaseStudyBySlug = cache(
	async (slug: string, draft = false): Promise<CaseStudy | null> => {
		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "case-studies",
			where: draft
				? { slug: { equals: slug } }
				: { slug: { equals: slug }, _status: { equals: "published" } },
			draft,
			limit: 1,
			depth: 2,
		});

		return result.docs[0] ?? null;
	},
);

/**
 * Returns all published case study slugs — used by generateStaticParams.
 * Not cached — runs at build time in a different context.
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "case-studies",
		where: { _status: { equals: "published" } },
		limit: 1000,
		depth: 0,
	});

	return result.docs.map((doc) => doc.slug).filter(Boolean) as string[];
}
