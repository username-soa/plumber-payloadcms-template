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
 * Payload polymorphic relationship item for the Reviews collection.
 * `value` is a number (unresolved ID) or a resolved Review document.
 */
type HighlightedReviewRelation = {
	relationTo: "reviews";
	value:
		| number
		| {
				author: string;
				rating: number;
				date: string;
				platform: "google" | "facebook" | "yelp" | "website" | "other";
				content: string;
		  };
};

/**
 * Generate a single Review schema.
 * `platform` is informational only and not part of Schema.org spec —
 * accept any string to support both CMS ('google') and site-config ('Google') values.
 */
export function generateReviewSchema(
	review: Omit<FeaturedReview, "platform"> & { platform: string },
) {
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
		const featured = companyInfo.seo.reviews
			.highlightedReviews as HighlightedReviewRelation[];
		return featured
			.map(({ value: r }) => {
				// Skip unresolved IDs (only populate if the relationship was fetched)
				if (typeof r === "number") return null;
				return generateReviewSchema({
					author: r.author,
					rating: r.rating,
					text: r.content,
					date: r.date ? new Date(r.date).toISOString().split("T")[0] : "",
					platform: r.platform,
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

	// Use Payload CMS data if available
	if (companyInfo?.seo?.reviews?.ratingValue) {
		const {
			ratingValue,
			reviewCount,
			bestRating,
			worstRating,
			highlightedReviews,
		} = companyInfo.seo.reviews;
		const featured = highlightedReviews as
			| HighlightedReviewRelation[]
			| null
			| undefined;
		return {
			"@type": "LocalBusiness",
			"@id": `${siteUrl}/${schemaIds.organization}`,
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: ratingValue.toString(),
				reviewCount: reviewCount.toString(),
				bestRating: (bestRating ?? 5).toString(),
				worstRating: (worstRating ?? 1).toString(),
			},
			review: featured
				?.map(({ value: r }) => {
					// Skip unresolved IDs
					if (typeof r === "number") return null;
					return generateReviewSchema({
						author: r.author,
						rating: r.rating,
						text: r.content,
						date: r.date ? new Date(r.date).toISOString().split("T")[0] : "",
						platform: r.platform,
					});
				})
				.filter(Boolean),
		};
	}

	// Fallback to site-config.ts hardcoded data
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
