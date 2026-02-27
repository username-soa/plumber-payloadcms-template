import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { BlogPost } from "@/payload-types";

/**
 * Fetches a single blog post by slug.
 * Wrapped with React.cache() to deduplicate within a render pass
 * (e.g. generateMetadata + BlogPostPage share one DB hit).
 */
export const getBlogPostBySlug = cache(
	async (slug: string, draft = false): Promise<BlogPost | null> => {
		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "blog-posts",
			where: draft
				? { slug: { equals: slug } }
				: { slug: { equals: slug }, status: { equals: "published" } },
			draft,
			limit: 1,
			depth: 2,
		});

		return result.docs[0] ?? null;
	},
);

/**
 * Returns all published blog post slugs — used by generateStaticParams.
 * Not cached — runs at build time in a different context.
 */
export async function getAllBlogPostSlugs(): Promise<string[]> {
	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "blog-posts",
		where: { status: { equals: "published" } },
		limit: 1000,
		depth: 0,
	});

	return result.docs.map((doc) => doc.slug).filter(Boolean) as string[];
}

/**
 * Fetches related blog posts in the same category, excluding the current post.
 */
export async function getRelatedPosts(
	categoryId: number,
	currentSlug: string,
	limit = 3,
): Promise<BlogPost[]> {
	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "blog-posts",
		where: {
			and: [
				{ category: { equals: categoryId } },
				{ slug: { not_equals: currentSlug } },
				{ status: { equals: "published" } },
			],
		},
		limit,
		depth: 1,
		sort: "-publishedAt",
	});

	return result.docs;
}
