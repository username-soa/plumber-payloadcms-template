/**
 * Organization/LocalBusiness Schema Generator
 *
 * Generates Schema.org LocalBusiness + Plumber structured data
 * for local SEO optimization.
 */

import { SITE_CONFIG } from "../site-config";
import type { CompanyInfo, Service } from "@/payload-types";
import type {
	PostalAddress,
	GeoCoordinates,
	OpeningHoursSpecification,
	AggregateRating,
	AreaServed,
} from "./types";

/**
 * Generate the PostalAddress schema
 */
export function generateAddress(companyInfo?: CompanyInfo): PostalAddress {
	const payloadLocation = companyInfo?.seo?.location;

	if (payloadLocation) {
		return {
			"@type": "PostalAddress",
			streetAddress: payloadLocation.streetAddress,
			addressLocality: payloadLocation.city,
			addressRegion: payloadLocation.stateCode,
			postalCode: payloadLocation.postalCode,
			addressCountry: payloadLocation.countryCode,
		};
	}

	const { location } = SITE_CONFIG.seo;
	return {
		"@type": "PostalAddress",
		streetAddress: location.streetAddress,
		addressLocality: location.city,
		addressRegion: location.stateCode,
		postalCode: location.postalCode,
		addressCountry: location.countryCode,
	};
}

/**
 * Generate GeoCoordinates schema
 */
export function generateGeoCoordinates(
	companyInfo?: CompanyInfo,
): GeoCoordinates {
	const payloadLocation = companyInfo?.seo?.location;

	if (payloadLocation?.latitude && payloadLocation?.longitude) {
		return {
			"@type": "GeoCoordinates",
			latitude: payloadLocation.latitude,
			longitude: payloadLocation.longitude,
		};
	}

	const { coordinates } = SITE_CONFIG.seo;
	return {
		"@type": "GeoCoordinates",
		latitude: coordinates.latitude,
		longitude: coordinates.longitude,
	};
}

/**
 * Generate service areas schema
 */
export function generateAreaServed(companyInfo?: CompanyInfo): AreaServed[] {
	const payloadAreas = companyInfo?.seo?.serviceAreas;
	const payloadLocation = companyInfo?.seo?.location;

	if (payloadAreas?.length && payloadLocation) {
		return payloadAreas.map((area) => ({
			"@type": "City" as const,
			name: area.name || "",
			containedInPlace: {
				"@type": "State" as const,
				name: payloadLocation.state,
				containedInPlace: {
					"@type": "Country" as const,
					name: payloadLocation.country,
				},
			},
		}));
	}

	// Fallback to static config (deprecated)
	const { serviceAreas, location } = SITE_CONFIG.seo;

	return serviceAreas.map((area) => ({
		"@type": "City" as const,
		name: area.name,
		containedInPlace: {
			"@type": "State" as const,
			name: location.state,
			containedInPlace: {
				"@type": "Country" as const,
				name: location.country,
			},
		},
	}));
}

/**
 * Generate opening hours specification
 * Includes both regular hours and 24/7 emergency
 */
export function generateOpeningHours(
	companyInfo?: CompanyInfo,
): OpeningHoursSpecification[] {
	const specs: OpeningHoursSpecification[] = [];
	const workingHours = companyInfo?.workingHours || SITE_CONFIG.workingHours;

	// Parse working hours
	workingHours?.forEach((wh) => {
		if (wh.time === "Closed") return;

		const [opens, closes] = wh.time.split(" - ").map((t) => {
			// Convert "08:00 AM" to "08:00" format
			const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
			if (!match) return t;
			let hours = parseInt(match[1]);
			const minutes = match[2];
			const period = match[3].toUpperCase();
			if (period === "PM" && hours !== 12) hours += 12;
			if (period === "AM" && hours === 12) hours = 0;
			return `${hours.toString().padStart(2, "0")}:${minutes}`;
		});

		// Map day strings to Schema.org format
		let days: string[];
		if (wh.day === "Mon-Fri") {
			days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		} else if (wh.day === "Saturday") {
			days = ["Saturday"];
		} else if (wh.day === "Sunday") {
			days = ["Sunday"];
		} else {
			days = [wh.day];
		}

		specs.push({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: days,
			opens,
			closes,
		});
	});

	// Add 24/7 emergency hours from Payload
	// Check if an emergency service is linked
	const emergencyService = companyInfo?.seo?.emergencyService as
		| Service
		| undefined;

	if (emergencyService?.isEmergency) {
		specs.push({
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
			description: "24/7 Emergency Service",
		});
	} else if (SITE_CONFIG.seo.emergencyServiceSlug) {
		// Fallback to static config
		const staticEmergencyService = SITE_CONFIG.services.find(
			(s) => s.slug === SITE_CONFIG.seo.emergencyServiceSlug,
		);
		if (staticEmergencyService && "isEmergency" in staticEmergencyService) {
			specs.push({
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
				description: "24/7 Emergency Service",
			});
		}
	}

	return specs;
}

/**
 * Generate aggregate rating schema
 */
export function generateAggregateRating(
	companyInfo?: CompanyInfo,
): AggregateRating {
	// Payload Data
	if (
		companyInfo?.seo?.reviews?.ratingValue &&
		companyInfo.seo.reviews.source === "hardcoded"
	) {
		const { ratingValue, reviewCount, bestRating, worstRating } =
			companyInfo.seo.reviews;
		return {
			"@type": "AggregateRating",
			ratingValue: ratingValue.toString(),
			reviewCount: reviewCount.toString(),
			bestRating: (bestRating || 5).toString(),
			worstRating: (worstRating || 1).toString(),
		};
	}

	// Fallback
	const { aggregate } = SITE_CONFIG.seo.reviews;
	return {
		"@type": "AggregateRating",
		ratingValue: aggregate.ratingValue.toString(),
		reviewCount: aggregate.reviewCount.toString(),
		bestRating: aggregate.bestRating.toString(),
		worstRating: aggregate.worstRating.toString(),
	};
}

/**
 * Generate the offer catalog from priority services
 */
export function generateOfferCatalog(companyInfo?: CompanyInfo) {
	const { siteUrl } = SITE_CONFIG.seo;

	// Payload Data
	if (
		companyInfo?.seo?.priorityServices &&
		companyInfo.seo.priorityServices.length > 0
	) {
		const services = companyInfo.seo.priorityServices as Service[];

		return {
			"@type": "OfferCatalog",
			name: "Plumbing Services",
			itemListElement: services.map((service) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: service.title,
					url: `${siteUrl}/services/${service.slug}`,
				},
			})),
		};
	}

	// Fallback
	const { priorityServices } = SITE_CONFIG.seo;
	const services = SITE_CONFIG.services.filter((s) =>
		priorityServices.includes(s.slug),
	);

	return {
		"@type": "OfferCatalog",
		name: "Plumbing Services",
		itemListElement: services.map((service) => ({
			"@type": "Offer",
			itemOffered: {
				"@type": "Service",
				name: service.title,
				url: `${siteUrl}/services/${service.slug}`,
			},
		})),
	};
}

/**
 * Generate credentials/certifications schema
 */
export function generateCredentials() {
	const { certifications } = SITE_CONFIG.aboutUs;
	return certifications.map((cert) => ({
		"@type": "EducationalOccupationalCredential",
		credentialCategory: cert.name,
		description: cert.description,
	}));
}

/**
 * Generate the complete LocalBusiness + Plumber schema
 * This is the main organization schema used across the site
 */
export function generateOrganizationSchema(companyInfo?: CompanyInfo) {
	// CMS Data or Config Data
	const name = companyInfo?.brand?.name || SITE_CONFIG.brand.name;
	const description =
		companyInfo?.brand?.description || SITE_CONFIG.brand.description;
	const phone = companyInfo?.phone || SITE_CONFIG.contact.phone;
	const email = companyInfo?.email || SITE_CONFIG.contact.email;

	// SEO Specifics from CMS
	const foundingDate =
		companyInfo?.seo?.foundingDate || SITE_CONFIG.seo.foundingDate;
	const priceRange =
		companyInfo?.seo?.businessType === "Plumber" // Assuming default
			? SITE_CONFIG.seo.priceRange
			: SITE_CONFIG.seo.priceRange;

	const { siteUrl, schemaIds } = SITE_CONFIG.seo;

	// Socials (CMS or Config)
	const socials = companyInfo?.socials || SITE_CONFIG.socials;

	// Logo handling
	let logoUrl = `${siteUrl}/logo.png`;
	if (
		companyInfo?.brand?.logo &&
		typeof companyInfo.brand.logo === "object" &&
		"url" in companyInfo.brand.logo
	) {
		logoUrl = companyInfo.brand.logo.url || logoUrl;
	}

	return {
		"@type": ["LocalBusiness", "Plumber"],
		"@id": `${siteUrl}/${schemaIds.organization}`,
		name,
		description,
		url: siteUrl,
		telephone: phone,
		email,
		foundingDate: foundingDate ? foundingDate.split("-")[0] : "2005",
		priceRange,
		logo: {
			"@type": "ImageObject",
			url: logoUrl,
			width: 512,
			height: 512,
		},
		image: `${siteUrl}/images/about/about-team.png`,
		address: generateAddress(companyInfo),
		geo: generateGeoCoordinates(companyInfo),
		areaServed: generateAreaServed(companyInfo),
		openingHoursSpecification: generateOpeningHours(companyInfo),
		aggregateRating: generateAggregateRating(companyInfo),
		hasOfferCatalog: generateOfferCatalog(companyInfo),
		hasCredential: generateCredentials(),
		sameAs: socials.map((s) => s.href).filter((h) => h !== "#"),
		paymentAccepted: ["Cash", "Credit Card", "EFTPOS", "Bank Transfer"],
		currenciesAccepted: "AUD",
	};
}
