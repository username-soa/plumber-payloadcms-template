/**
 * Service Schema Generator
 *
 * Generates Schema.org Service structured data
 * for individual service pages with local SEO optimization.
 */

import { SITE_CONFIG } from "../site-config";
import type { ServiceConfig } from "./types";

/**
 * Generate the areaServed for a service
 * Uses the primary city with state/country context
 */
function generateServiceAreaServed() {
	const { location } = SITE_CONFIG.seo;

	return {
		"@type": "City",
		name: location.city,
		containedInPlace: {
			"@type": "State",
			name: location.state,
			containedInPlace: {
				"@type": "Country",
				name: location.country,
			},
		},
	};
}

/**
 * Generate sub-services offer catalog if available
 */
function generateSubServicesOfferCatalog(service: ServiceConfig) {
	if (!("subServices" in service) || !service.subServices) {
		return undefined;
	}

	return {
		"@type": "OfferCatalog",
		name: `${service.title} Methods`,
		itemListElement: service.subServices.map(
			(sub: { title: string; description: string }) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: sub.title,
					description: sub.description,
				},
			}),
		),
	};
}

/**
 * Generate Service schema for a service page
 */
export function generateServiceSchema(service: ServiceConfig) {
	const { siteUrl, schemaIds, location } = SITE_CONFIG.seo;
	const serviceUrl = `${siteUrl}/services/${service.slug}`;

	const isEmergency = "isEmergency" in service && service.isEmergency;

	const schema: Record<string, unknown> = {
		"@type": "Service",
		"@id": `${serviceUrl}/#service`,
		serviceType: service.title,
		name: `${service.title} in ${location.city}`,
		description: service.longDescription || service.description,
		url: serviceUrl,
		provider: { "@id": `${siteUrl}/${schemaIds.organization}` },
		areaServed: generateServiceAreaServed(),
		offers: {
			"@type": "Offer",
			availability: "https://schema.org/InStock",
			priceSpecification: {
				"@type": "PriceSpecification",
				priceCurrency: "AUD",
			},
		},
	};

	// Add sub-services if available
	const subServicesOfferCatalog = generateSubServicesOfferCatalog(service);
	if (subServicesOfferCatalog) {
		schema.hasOfferCatalog = subServicesOfferCatalog;
	}

	// Add 24/7 availability for emergency services
	if (isEmergency) {
		schema.availableChannel = {
			"@type": "ServiceChannel",
			servicePhone: {
				"@type": "ContactPoint",
				telephone: location.phone,
			},
			availableLanguage: "English",
			serviceUrl,
		};
		schema.hoursAvailable = {
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
		};
		schema.termsOfService =
			"Emergency call-out fees may apply outside regular hours";
	}

	return schema;
}

/**
 * Generate the services listing page schema
 */
export function generateServicesListingSchema() {
	const { brand, services } = SITE_CONFIG;
	const { siteUrl, schemaIds, location } = SITE_CONFIG.seo;

	return {
		"@type": "ItemList",
		"@id": `${siteUrl}/services/#itemlist`,
		name: `Plumbing Services in ${location.city}`,
		description: `Professional plumbing services offered by ${brand.name} in ${location.city} and surrounding areas.`,
		numberOfItems: services.length,
		itemListElement: services.map((service, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Service",
				name: service.title,
				description: service.description,
				url: `${siteUrl}/services/${service.slug}`,
				provider: { "@id": `${siteUrl}/${schemaIds.organization}` },
			},
		})),
	};
}
