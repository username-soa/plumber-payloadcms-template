/**
 * TypeScript types for JSON-LD structured data
 */

import type { SITE_CONFIG } from "../site-config";

// Infer types from the config
export type SiteConfig = typeof SITE_CONFIG;
export type SeoConfig = SiteConfig["seo"];
export type LocationConfig = SeoConfig["location"];
export type ServiceAreaConfig = SeoConfig["serviceAreas"][number];
export type ReviewConfig = SeoConfig["reviews"];
export type FeaturedReview = ReviewConfig["featured"][number];

// Service type from config
export type ServiceConfig = SiteConfig["services"][number];

// Schema.org base types
export interface SchemaOrgBase {
	"@context"?: string;
	"@type": string | string[];
	"@id"?: string;
}

export interface PostalAddress {
	"@type": "PostalAddress";
	streetAddress: string;
	addressLocality: string;
	addressRegion: string;
	postalCode: string;
	addressCountry: string;
}

export interface GeoCoordinates {
	"@type": "GeoCoordinates";
	latitude: string;
	longitude: string;
}

export interface OpeningHoursSpecification {
	"@type": "OpeningHoursSpecification";
	dayOfWeek: string | string[];
	opens: string;
	closes: string;
	description?: string;
}

export interface AggregateRating {
	"@type": "AggregateRating";
	ratingValue: string;
	reviewCount: string;
	bestRating: string;
	worstRating: string;
}

export interface ImageObject {
	"@type": "ImageObject";
	url: string;
	width?: number;
	height?: number;
}

export interface Organization {
	"@type": "Organization";
	name: string;
	"@id"?: string;
}

export interface Person {
	"@type": "Person";
	name: string;
	url?: string;
}

export interface AreaServed {
	"@type": "City" | "State" | "Country";
	name: string;
	containedInPlace?: AreaServed;
}

export interface BreadcrumbItem {
	"@type": "ListItem";
	position: number;
	name: string;
	item?: string;
}

export interface ContactPoint {
	"@type": "ContactPoint";
	telephone: string;
	contactType: string;
	areaServed?: string;
	availableLanguage?: string[];
	hoursAvailable?: OpeningHoursSpecification;
}

// Graph structure for multiple schemas
export interface SchemaGraph {
	"@context": string;
	"@graph": SchemaOrgBase[];
}
