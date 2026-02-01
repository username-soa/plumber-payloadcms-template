/**
 * WebSite Schema Generator
 *
 * Generates Schema.org WebSite structured data
 * with potential for sitelinks searchbox.
 */

import { SITE_CONFIG } from "../site-config";
import type { CompanyInfo } from "@/payload-types";

/**
 * Generate the WebSite schema
 * Enables sitelinks searchbox in Google results
 */
export function generateWebsiteSchema(companyInfo?: CompanyInfo) {
	const brandName = companyInfo?.brand?.name || SITE_CONFIG.brand.name;
	const brandDesc =
		companyInfo?.brand?.description || SITE_CONFIG.brand.description;
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;

	return {
		"@type": "WebSite",
		"@id": `${siteUrl}/${schemaIds.website}`,
		url: siteUrl,
		name: brandName,
		description: brandDesc,
		publisher: { "@id": `${siteUrl}/${schemaIds.organization}` },
		inLanguage: "en-AU",
		// Enable sitelinks searchbox (requires site search functionality)
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteUrl}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

/**
 * Generate WebPage schema for specific pages
 */
export function generateWebPageSchema(options: {
	name: string;
	description: string;
	url: string;
	type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;

	return {
		"@type": options.type ?? "WebPage",
		"@id": `${options.url}/#webpage`,
		url: options.url,
		name: options.name,
		description: options.description,
		isPartOf: { "@id": `${siteUrl}/${schemaIds.website}` },
		about: { "@id": `${siteUrl}/${schemaIds.organization}` },
		inLanguage: "en-AU",
	};
}
