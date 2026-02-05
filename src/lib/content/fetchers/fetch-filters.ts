/**
 * Filter Fetchers
 * Cached functions for fetching category and tag options from the CMS
 */

import { cache } from "react";
import type { Payload } from "payload";
import type { Category, Tag } from "@/payload-types";
import type {
	ContentType,
	FilterOptions,
	CategoryOption,
	TagOption,
} from "../types";
import { SERVICE_CATEGORY_OPTIONS } from "../types";

// =============================================================================
// Cached Database Fetchers
// =============================================================================

/**
 * Fetch categories from CMS (cached to dedupe across renders)
 */
export const getCachedCategories = cache(
	async (payload: Payload, contentType: ContentType) => {
		return payload.find({
			collection: "categories",
			where: { appliesTo: { contains: contentType } },
			limit: 100,
			sort: "name",
		});
	},
);

/**
 * Fetch tags from CMS (cached to dedupe across renders)
 */
export const getCachedTags = cache(
	async (payload: Payload, contentType: ContentType) => {
		return payload.find({
			collection: "tags",
			where: { appliesTo: { contains: contentType } },
			limit: 100,
			sort: "name",
		});
	},
);

/**
 * Fetch a category by slug (cached for filter resolution)
 */
export const getCachedCategoryBySlug = cache(
	async (payload: Payload, slug: string) => {
		return payload.find({
			collection: "categories",
			where: { slug: { equals: slug } },
			limit: 1,
		});
	},
);

/**
 * Fetch a tag by slug (cached for filter resolution)
 */
export const getCachedTagBySlug = cache(
	async (payload: Payload, slug: string) => {
		return payload.find({
			collection: "tags",
			where: { slug: { equals: slug } },
			limit: 1,
		});
	},
);

// =============================================================================
// Filter Options Builder
// =============================================================================

/**
 * Get all filter options for a content type
 * Returns category and tag options formatted for UI components
 */
export async function getFilterOptions(
	payload: Payload,
	contentType: ContentType,
): Promise<FilterOptions> {
	// Services use hardcoded filters
	if (contentType === "services") {
		return {
			categoryOptions: SERVICE_CATEGORY_OPTIONS,
			tagOptions: [],
		};
	}

	// Fetch categories and tags in parallel
	const [categoriesResult, tagsResult] = await Promise.all([
		getCachedCategories(payload, contentType),
		getCachedTags(payload, contentType),
	]);

	const categoryOptions: CategoryOption[] = [
		{ label: "All Categories", value: "all" },
		...categoriesResult.docs.map((cat: Category) => ({
			label: cat.name,
			value: cat.slug,
		})),
	];

	const tagOptions: TagOption[] = [
		{ label: "All Tags", value: "all" },
		...tagsResult.docs.map((tag: Tag) => ({
			label: tag.name,
			value: tag.slug,
		})),
	];

	return { categoryOptions, tagOptions };
}

/**
 * Resolve a category slug to its ID
 */
export async function resolveCategorySlug(
	payload: Payload,
	slug: string,
): Promise<number | string | null> {
	const result = await getCachedCategoryBySlug(payload, slug);
	return result.docs.length > 0 ? result.docs[0].id : null;
}

/**
 * Resolve a tag slug to its ID
 */
export async function resolveTagSlug(
	payload: Payload,
	slug: string,
): Promise<number | string | null> {
	const result = await getCachedTagBySlug(payload, slug);
	return result.docs.length > 0 ? result.docs[0].id : null;
}
