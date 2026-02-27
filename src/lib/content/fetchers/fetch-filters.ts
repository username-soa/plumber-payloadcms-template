/**
 * Filter Fetchers
 * Self-contained, cached functions for fetching category and tag options.
 *
 * These are self-contained — they call getPayload() internally so callers
 * don't need to manage the payload instance (consistent with lib/payload pattern).
 */

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cache } from "react";
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
 * Fetch categories from CMS (cached to dedupe across renders within a request)
 */
const getCachedCategories = cache(async (contentType: ContentType) => {
	const payload = await getPayload({ config: configPromise });
	return payload.find({
		collection: "categories",
		where: { appliesTo: { contains: contentType } },
		limit: 100,
		sort: "name",
	});
});

/**
 * Fetch tags from CMS (cached to dedupe across renders within a request)
 */
const getCachedTags = cache(async (contentType: ContentType) => {
	const payload = await getPayload({ config: configPromise });
	return payload.find({
		collection: "tags",
		where: { appliesTo: { contains: contentType } },
		limit: 100,
		sort: "name",
	});
});

/**
 * Fetch a category by slug (cached for filter resolution)
 */
const getCachedCategoryBySlug = cache(async (slug: string) => {
	const payload = await getPayload({ config: configPromise });
	return payload.find({
		collection: "categories",
		where: { slug: { equals: slug } },
		limit: 1,
	});
});

/**
 * Fetch a tag by slug (cached for filter resolution)
 */
const getCachedTagBySlug = cache(async (slug: string) => {
	const payload = await getPayload({ config: configPromise });
	return payload.find({
		collection: "tags",
		where: { slug: { equals: slug } },
		limit: 1,
	});
});

// =============================================================================
// Filter Options Builder
// =============================================================================

/**
 * Get all filter options for a content type.
 * Returns category and tag options formatted for UI components.
 */
export async function getFilterOptions(
	contentType: ContentType,
): Promise<FilterOptions> {
	// Services use hardcoded filters (no CMS categories/tags)
	if (contentType === "services") {
		return {
			categoryOptions: SERVICE_CATEGORY_OPTIONS,
			tagOptions: [],
		};
	}

	// Fetch categories and tags in parallel
	const [categoriesResult, tagsResult] = await Promise.all([
		getCachedCategories(contentType),
		getCachedTags(contentType),
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
 * Resolve a category slug to its ID.
 * Used internally by the query builder.
 */
export async function resolveCategorySlug(
	slug: string,
): Promise<number | string | null> {
	const result = await getCachedCategoryBySlug(slug);
	return result.docs.length > 0 ? result.docs[0].id : null;
}

/**
 * Resolve a tag slug to its ID.
 * Used internally by the query builder.
 */
export async function resolveTagSlug(
	slug: string,
): Promise<number | string | null> {
	const result = await getCachedTagBySlug(slug);
	return result.docs.length > 0 ? result.docs[0].id : null;
}
