/**
 * Review Schema Generator
 *
 * Generates Schema.org Review structured data
 * from configured reviews.
 */

import { SITE_CONFIG } from "../site-config";
import type { CompanyInfo } from "@/payload-types";
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
export function generateFeaturedReviewsSchema(companyInfo?: CompanyInfo) {
	if (companyInfo?.seo?.reviews?.highlightedReviews) {
		const featured = companyInfo.seo.reviews.highlightedReviews;
		// Map Payload review format to FeaturedReview type or handle directly
		return featured
			.map((r: any) => {
				if (typeof r === "string") return null;
				return generateReviewSchema({
					author: r.author,
					rating: r.rating,
					text: r.content,
					date: r.date,
					platform: (r.platform as any) || "Google", // Simple cast or fallback
				});
			})
			.filter(Boolean);
	}

	const { featured } = SITE_CONFIG.seo.reviews;
	return featured.map(generateReviewSchema);
}

/**
 * Generate AggregateRating with individual reviews
 * Useful for pages that show reviews
 */
export function generateReviewsWithAggregate(companyInfo?: CompanyInfo) {
	const { siteUrl, schemaIds } = SITE_CONFIG.seo;

	// Use Payload data if available
	if (companyInfo?.seo?.reviews?.ratingValue) {
		const {
			ratingValue,
			reviewCount,
			bestRating,
			worstRating,
			highlightedReviews,
		} = companyInfo.seo.reviews;
		const featured = highlightedReviews;
		return {
			"@type": "LocalBusiness",
			"@id": `${siteUrl}/${schemaIds.organization}`,
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: ratingValue.toString(),
				reviewCount: reviewCount.toString(),
				bestRating: (bestRating || 5).toString(),
				worstRating: (worstRating || 1).toString(),
			},
			review: (featured as any[])
				?.map((r) => {
					if (typeof r === "string") return null;
					return generateReviewSchema({
						author: r.author,
						rating: r.rating,
						text: r.content,
						date: r.date,
						platform: (r.platform as any) || "Google",
					});
				})
				.filter(Boolean),
		};
	}

	// Fallback
	const { aggregate, featured } = SITE_CONFIG.seo.reviews;
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
