/**
 * Page-Level JSON-LD Generator (Option C — CMS pageType field)
 *
 * Reads the `pageType` field set by editors in the Payload CMS Pages collection
 * and generates the appropriate Schema.org WebPage schema along with any
 * page-type-specific extras (Organization contactPoints, Services ItemList, etc.).
 *
 * @see src/collections/Pages.ts — where pageType is defined
 */

import { SITE_CONFIG } from "../site-config";
import type { CompanyInfo, Page, Service } from "@/payload-types";
import { generateWebPageSchema } from "./website";
import { generateOrganizationSchema } from "./organization";
import { generateServicesListingSchema } from "./service";

const { seo } = SITE_CONFIG;

type PageType = "default" | "about" | "contact" | "servicesListing";

/**
 * Build the full JSON-LD @graph array for a dynamic [slug] page.
 *
 * @param page        - The Payload Page document (must be populated / not null)
 * @param companyInfo - The CompanyInfo global (fetch before calling)
 * @param services    - Service docs; only needed when pageType === "servicesListing"
 */
export function generatePageJsonLd(
	page: Page,
	companyInfo: CompanyInfo,
	services?: Service[],
): object[] {
	// pageType is set by editors in the Payload CMS admin (see src/collections/Pages.ts).
	const pageType = page.pageType ?? "default";
	const title = page.meta?.title || page.title;
	const description =
		page.meta?.description || SITE_CONFIG.brand.description || "";
	const pageUrl = `${seo.siteUrl}/${page.slug}`;

	// Every page gets at minimum a WebPage schema.
	const webPageTypeMap: Record<
		PageType,
		"WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"
	> = {
		default: "WebPage",
		about: "AboutPage",
		contact: "ContactPage",
		servicesListing: "CollectionPage",
	};

	const graph: object[] = [
		generateWebPageSchema({
			name: title,
			description,
			url: pageUrl,
			type: webPageTypeMap[pageType],
		}),
	];

	// --- About Page: add the full Organization schema ---
	if (pageType === "about") {
		graph.push(generateOrganizationSchema(companyInfo));
	}

	// --- Contact Page: add Organization schema with contactPoints ---
	if (pageType === "contact") {
		const phone = companyInfo?.phone || seo.location.phone;
		const countryCode =
			companyInfo?.seo?.location?.countryCode || seo.location.countryCode;

		graph.push({
			...generateOrganizationSchema(companyInfo),
			contactPoint: [
				{
					"@type": "ContactPoint",
					telephone: phone,
					contactType: "customer service",
					areaServed: countryCode,
					availableLanguage: ["English"],
				},
				{
					"@type": "ContactPoint",
					telephone: phone,
					contactType: "emergency",
					areaServed: countryCode,
					availableLanguage: ["English"],
					hoursAvailable: {
						"@type": "OpeningHoursSpecification",
						dayOfWeek: [
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
							"Sunday",
						],
						opens: "00:00",
						closes: "23:59",
					},
				},
			],
		});
	}

	// --- Services Listing: add ItemList of services ---
	if (pageType === "servicesListing" && services && services.length > 0) {
		graph.push(generateServicesListingSchema(services, companyInfo));
	}

	return graph;
}
