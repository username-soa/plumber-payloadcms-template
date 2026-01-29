import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { getPayload } from "payload";
import config from "@payload-config";

const { seo, services } = SITE_CONFIG;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = seo.siteUrl;

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/case-studies`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/terms-conditions`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	// Dynamic service pages
	const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
		url: `${baseUrl}/services/${service.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const payload = await getPayload({ config });

	// Dynamic blog posts from Payload
	const blogPostsResult = await payload.find({
		collection: "blog-posts",
		where: { _status: { equals: "published" } },
		limit: 1000,
	});
	const blogPages: MetadataRoute.Sitemap = blogPostsResult.docs
		.filter((post) => post.slug)
		.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		}));

	// Dynamic case studies from Payload
	const caseStudiesResult = await payload.find({
		collection: "case-studies",
		where: { _status: { equals: "published" } },
		limit: 1000,
	});
	const caseStudyPages: MetadataRoute.Sitemap = caseStudiesResult.docs
		.filter((study) => study.slug)
		.map((study) => ({
			url: `${baseUrl}/case-studies/${study.slug}`,
			lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		}));

	return [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages];
}
