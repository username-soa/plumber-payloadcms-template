import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { getPayload } from "payload";
import config from "@payload-config";

const baseUrl = SITE_CONFIG.seo.siteUrl;

// The homepage is always present regardless of what's in the CMS.
const homepageEntry: MetadataRoute.Sitemap[number] = {
	url: baseUrl,
	changeFrequency: "weekly",
	priority: 1,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	try {
		const payload = await getPayload({ config });

		// Run all four queries in parallel for performance.
		const [pagesResult, servicesResult, blogPostsResult, caseStudiesResult] =
			await Promise.all([
				// Pages — custom `status` field (not Payload drafts)
				payload.find({
					collection: "pages",
					where: { status: { equals: "published" } },
					limit: 0, // fetch all
					select: { slug: true, updatedAt: true },
				}),

				// Services — no status field; all are considered live
				payload.find({
					collection: "services",
					limit: 0,
					select: { slug: true, updatedAt: true },
				}),

				// Blog posts — uses Payload's built-in draft/publish system
				payload.find({
					collection: "blog-posts",
					where: { _status: { equals: "published" } },
					limit: 0,
					select: { slug: true, updatedAt: true },
				}),

				// Case studies — uses Payload's built-in draft/publish system
				payload.find({
					collection: "case-studies",
					where: { _status: { equals: "published" } },
					limit: 0,
					select: { slug: true, updatedAt: true },
				}),
			]);

		// Map Pages — exclude the homepage slug (handled separately with priority 1).
		const pageEntries: MetadataRoute.Sitemap = pagesResult.docs
			// Exclude homepage slugs — handled separately above with priority 1
			.filter(
				(page) => page.slug && page.slug !== "home" && page.slug !== "index",
			)
			.map((page) => ({
				url: `${baseUrl}/${page.slug}`,
				lastModified: page.updatedAt ? new Date(page.updatedAt) : undefined,
				changeFrequency: "monthly" as const,
				priority: 0.8,
			}));

		// Map Services
		const serviceEntries: MetadataRoute.Sitemap = servicesResult.docs
			.filter((service) => service.slug)
			.map((service) => ({
				url: `${baseUrl}/services/${service.slug}`,
				lastModified: service.updatedAt
					? new Date(service.updatedAt)
					: undefined,
				changeFrequency: "monthly" as const,
				priority: 0.8,
			}));

		// Map Blog posts
		const blogEntries: MetadataRoute.Sitemap = blogPostsResult.docs
			.filter((post) => post.slug)
			.map((post) => ({
				url: `${baseUrl}/blog/${post.slug}`,
				lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
				changeFrequency: "monthly" as const,
				priority: 0.7,
			}));

		// Map Case Studies
		const caseStudyEntries: MetadataRoute.Sitemap = caseStudiesResult.docs
			.filter((study) => study.slug)
			.map((study) => ({
				url: `${baseUrl}/case-studies/${study.slug}`,
				lastModified: study.updatedAt ? new Date(study.updatedAt) : undefined,
				changeFrequency: "monthly" as const,
				priority: 0.7,
			}));

		return [
			homepageEntry,
			...pageEntries,
			...serviceEntries,
			...blogEntries,
			...caseStudyEntries,
		];
	} catch (error) {
		// If Payload is unavailable, return a minimal fallback so the sitemap
		// endpoint never returns a 500.
		console.error("[sitemap] Failed to generate dynamic sitemap:", error);
		return [homepageEntry];
	}
}
