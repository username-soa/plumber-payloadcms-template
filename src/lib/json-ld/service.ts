/**
 * Service Schema Generator
 *
 * Generates Schema.org Service structured data
 * for individual service pages with local SEO optimization.
 */

import { SITE_CONFIG } from "../site-config";
import type { ServiceConfig } from "./types";
import type { CompanyInfo, Service } from "@/payload-types";

// Combined type for input (Payload Service or Config Service)
type ServiceInput = ServiceConfig | Service;

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
export function generateServiceSchema(
	service: ServiceInput,
	companyInfo?: CompanyInfo,
) {
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;
	const serviceUrl = `${siteUrl}/services/${service.slug}`;

	const isEmergency = "isEmergency" in service && !!service.isEmergency;

	// Handle description - prefer simpler description for schema
	// Payload has explicit description field (textarea) which works well
	const description = service.description;

	// Use Payload Location if available
	const payloadLocation = companyInfo?.seo?.location;
	const city = payloadLocation?.city || SITE_CONFIG.seo.location.city;
	// @ts-ignore - types might not be regenerated yet
	const phone =
		companyInfo?.seo?.phoneDisplay || SITE_CONFIG.seo.location.phone;

	const schema: Record<string, unknown> = {
		"@type": "Service",
		"@id": `${serviceUrl}/#service`,
		serviceType: service.title,
		name: `${service.title} in ${city}`,
		description: description,
		url: serviceUrl,
		provider: { "@id": `${siteUrl}/${schemaIds.organization}` },
		// We could update generateServiceAreaServed to use companyInfo too, but strict migration only asked for specific fields.
		// For now we will rely on organization schema to define the main area served.
		areaServed: {
			"@type": "City",
			name: city,
		},
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
				telephone: phone,
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
	companyInfo?: CompanyInfo,
) {
	const brandName = companyInfo?.brand?.name || SITE_CONFIG.brand.name;
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;
	const city =
		companyInfo?.seo?.location?.city || SITE_CONFIG.seo.location.city;

	return {
		"@type": "ItemList",
		"@id": `${siteUrl}/services/#itemlist`,
		name: `Plumbing Services in ${city}`,
		description: `Professional plumbing services offered by ${brandName} in ${city} and surrounding areas.`,
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
