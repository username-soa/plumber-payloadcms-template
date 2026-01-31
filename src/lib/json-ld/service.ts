/**
 * Service Schema Generator
 *
 * Generates Schema.org Service structured data
 * for individual service pages with local SEO optimization.
 */

import { SITE_CONFIG } from "../site-config";
import type { ServiceConfig } from "./types";
import type { Service } from "@/payload-types";

// Combined type for input (Payload Service or Config Service)
type ServiceInput = ServiceConfig | Service;

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
function generateSubServicesOfferCatalog(service: ServiceInput) {
	if (!("subServices" in service) || !service.subServices) {
		return undefined;
	}

	// Normalize subServices to a common shape
	const subServices = service.subServices
		.map((sub) => {
			// Payload type might be partial or contain IDs
			if (typeof sub !== "object" || !sub) return null;
			return {
				title: sub.title,
				description: sub.description || "",
			};
		})
		.filter((sub): sub is { title: string; description: string } => !!sub);

	if (subServices.length === 0) return undefined;

	return {
		"@type": "OfferCatalog",
		name: `${service.title} Methods`,
		itemListElement: subServices.map((sub) => ({
			"@type": "Offer",
			itemOffered: {
				"@type": "Service",
				name: sub.title,
				description: sub.description,
			},
		})),
	};
}

/**
 * Generate Service schema for a service page
 */
export function generateServiceSchema(service: ServiceInput) {
	const { siteUrl, schemaIds, location } = SITE_CONFIG.seo;
	const serviceUrl = `${siteUrl}/services/${service.slug}`;

	const isEmergency = "isEmergency" in service && !!service.isEmergency;

	// Handle description - prefer simpler description for schema
	// Payload has explicit description field (textarea) which works well
	const description = service.description;

	const schema: Record<string, unknown> = {
		"@type": "Service",
		"@id": `${serviceUrl}/#service`,
		serviceType: service.title,
		name: `${service.title} in ${location.city}`,
		description: description,
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
export function generateServicesListingSchema(
	services: (Service | ServiceConfig)[] = SITE_CONFIG.services,
) {
	const { brand } = SITE_CONFIG;
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
