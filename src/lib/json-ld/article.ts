/**
 * Article/BlogPosting Schema Generator
 *
 * Generates Schema.org Article and BlogPosting structured data
 * for blog posts and case studies.
 */

import { SITE_CONFIG } from "../site-config";

import type { CompanyInfo } from "@/payload-types";

export interface ArticleSchemaOptions {
	title: string;
	description: string;
	slug: string;
	datePublished: string;
	dateModified?: string;
	author?: string;
	image?: string;
	category?: string;
	wordCount?: number;
	type: "BlogPosting" | "Article";
	basePath: "blog" | "case-studies";
}

/**
 * Generate BlogPosting or Article schema
 */
export function generateArticleSchema(
	options: ArticleSchemaOptions,
	companyInfo?: CompanyInfo,
) {
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;
	const articleUrl = `${siteUrl}/${options.basePath}/${options.slug}`;

	const schema: Record<string, unknown> = {
		"@type": options.type,
		"@id": `${articleUrl}/#article`,
		headline: options.title,
		description: options.description,
		url: articleUrl,
		datePublished: options.datePublished,
		dateModified: options.dateModified || options.datePublished,
		publisher: { "@id": `${siteUrl}/${schemaIds.organization}` },
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": articleUrl,
		},
		inLanguage: "en-AU",
	};

	// Add author
	if (options.author) {
		schema.author = {
			"@type": "Person",
			name: options.author,
			url: `${siteUrl}/about`,
		};
	} else {
		// Default to organization as author
		schema.author = { "@id": `${siteUrl}/${schemaIds.organization}` };
	}

	// Add image
	if (options.image) {
		schema.image = options.image.startsWith("http")
			? options.image
			: `${siteUrl}${options.image}`;
	}

	// Add category/section
	if (options.category) {
		schema.articleSection = options.category;
	}

	// Add word count if available
	if (options.wordCount) {
		schema.wordCount = options.wordCount;
	}

	// For case studies, add location context from Payload or Config
	if (options.basePath === "case-studies") {
		const payloadLocation = companyInfo?.seo?.location;
		if (payloadLocation) {
			schema.locationCreated = {
				"@type": "Place",
				address: {
					"@type": "PostalAddress",
					addressLocality: payloadLocation.city,
					addressRegion: payloadLocation.stateCode,
					addressCountry: payloadLocation.countryCode,
				},
			};
		} else {
			const { location } = SITE_CONFIG.seo;
			schema.locationCreated = {
				"@type": "Place",
				address: {
					"@type": "PostalAddress",
					addressLocality: location.city,
					addressRegion: location.stateCode,
					addressCountry: location.countryCode,
				},
			};
		}
	}

	return schema;
}

/**
 * Generate Blog listing page schema
 */
export function generateBlogListingSchema() {
	const { brand } = SITE_CONFIG;
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;

	return {
		"@type": "Blog",
		"@id": `${siteUrl}/blog/#blog`,
		name: `${brand.name} Plumbing Blog`,
		description: `Plumbing tips, guides, and advice from ${brand.name}`,
		url: `${siteUrl}/blog`,
		publisher: { "@id": `${siteUrl}/${schemaIds.organization}` },
		inLanguage: "en-AU",
	};
}

/**
 * Generate Case Studies listing page schema
 */
export function generateCaseStudiesListingSchema() {
	const { brand } = SITE_CONFIG;
	const { siteUrl, schemaIds, location } = SITE_CONFIG.seo;

	return {
		"@type": "CollectionPage",
		"@id": `${siteUrl}/case-studies/#collection`,
		name: `${brand.name} Case Studies`,
		description: `Real plumbing projects and success stories from ${brand.name} in ${location.city}`,
		url: `${siteUrl}/case-studies`,
		about: { "@id": `${siteUrl}/${schemaIds.organization}` },
		inLanguage: "en-AU",
	};
}
