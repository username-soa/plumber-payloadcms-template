/**
 * Organization/LocalBusiness Schema Generator
 *
 * Generates Schema.org LocalBusiness + Plumber structured data
 * for local SEO optimization.
 */

import { SITE_CONFIG } from "../site-config";
import type {
	PostalAddress,
	GeoCoordinates,
	OpeningHoursSpecification,
	AggregateRating,
	AreaServed,
} from "./types";

/**
 * Generate the PostalAddress schema from config
 */
export function generateAddress(): PostalAddress {
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
 * Generate GeoCoordinates schema from config
 */
export function generateGeoCoordinates(): GeoCoordinates {
	const { coordinates } = SITE_CONFIG.seo;
	return {
		"@type": "GeoCoordinates",
		latitude: coordinates.latitude,
		longitude: coordinates.longitude,
	};
}

/**
 * Generate service areas schema from config
 */
export function generateAreaServed(): AreaServed[] {
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
export function generateOpeningHours(): OpeningHoursSpecification[] {
	const { workingHours } = SITE_CONFIG;
	const specs: OpeningHoursSpecification[] = [];

	// Parse working hours from config
	workingHours.forEach((wh) => {
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

	// Add 24/7 emergency hours
	const emergencyService = SITE_CONFIG.services.find(
		(s) => s.slug === SITE_CONFIG.seo.emergencyServiceSlug,
	);
	if (emergencyService && "isEmergency" in emergencyService) {
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

	return specs;
}

/**
 * Generate aggregate rating schema from config
 */
export function generateAggregateRating(): AggregateRating {
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
export function generateOfferCatalog() {
	const { priorityServices, siteUrl } = SITE_CONFIG.seo;
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
export function generateOrganizationSchema() {
	const { brand, contact, socials } = SITE_CONFIG;
	const { siteUrl, schemaIds, priceRange, foundingDate, location } =
		SITE_CONFIG.seo;

	return {
		"@type": ["LocalBusiness", "Plumber"],
		"@id": `${siteUrl}/${schemaIds.organization}`,
		name: brand.name,
		description: brand.description,
		url: siteUrl,
		telephone: location.phone,
		email: contact.email,
		foundingDate: foundingDate.split("-")[0], // Just the year
		priceRange,
		logo: {
			"@type": "ImageObject",
			url: `${siteUrl}/logo.png`,
			width: 512,
			height: 512,
		},
		image: `${siteUrl}/images/about/about-team.png`,
		address: generateAddress(),
		geo: generateGeoCoordinates(),
		areaServed: generateAreaServed(),
		openingHoursSpecification: generateOpeningHours(),
		aggregateRating: generateAggregateRating(),
		hasOfferCatalog: generateOfferCatalog(),
		hasCredential: generateCredentials(),
		sameAs: socials.map((s) => s.href).filter((h) => h !== "#"),
		paymentAccepted: ["Cash", "Credit Card", "EFTPOS", "Bank Transfer"],
		currenciesAccepted: "AUD",
	};
}
