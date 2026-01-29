/**
 * Review Schema Generator
 *
 * Generates Schema.org Review structured data
 * from configured reviews.
 */

import { SITE_CONFIG } from "../site-config";
import type { FeaturedReview } from "./types";

/**
 * Generate a single Review schema
 */
export function generateReviewSchema(review: FeaturedReview) {
	return {
		"@type": "Review",
		reviewRating: {
			"@type": "Rating",
			ratingValue: review.rating.toString(),
			bestRating: "5",
		},
		author: {
			"@type": "Person",
			name: review.author,
		},
		datePublished: review.date,
		reviewBody: review.text,
	};
}

/**
 * Generate array of Review schemas from featured reviews
 */
export function generateFeaturedReviewsSchema() {
	const { featured } = SITE_CONFIG.seo.reviews;
	return featured.map(generateReviewSchema);
}

/**
 * Generate AggregateRating with individual reviews
 * Useful for pages that show reviews
 */
export function generateReviewsWithAggregate() {
	const { aggregate, featured } = SITE_CONFIG.seo.reviews;
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;

	return {
		"@type": "LocalBusiness",
		"@id": `${siteUrl}/${schemaIds.organization}`,
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: aggregate.ratingValue.toString(),
			reviewCount: aggregate.reviewCount.toString(),
			bestRating: aggregate.bestRating.toString(),
			worstRating: aggregate.worstRating.toString(),
		},
		review: featured.map(generateReviewSchema),
	};
}

// End of file
