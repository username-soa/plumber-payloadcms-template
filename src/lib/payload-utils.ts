import type { Media, Category, Tag } from "@/payload-types";

/**
 * Safely extracts the URL from a Payload Media object or ID.
 * Use this to avoid repetitive type checking and casting in components.
 */
export function getMediaUrl(
	media: string | number | Media | null | undefined,
): string | null {
	if (!media) return null;
	if (typeof media === "string") return media;
	if (typeof media === "number") return null; // Cannot get URL from ID alone without depth/population
	return media.url || null;
}

/**
 * Safely extracts the alt text from a Payload Media object.
 * Returns a fallback if specific alt text is missing but the media object exists.
 */
export function getMediaAlt(
	media: string | number | Media | null | undefined,
	fallback = "Image",
): string {
	if (!media || typeof media === "string" || typeof media === "number")
		return fallback;
	return media.alt || fallback;
}

/**
 * Type guard to check if a value is a populated Media object
 */
export function isMediaObject(media: unknown): media is Media {
	return (
		typeof media === "object" &&
		media !== null &&
		"url" in media &&
		typeof (media as Media).url === "string"
	);
}

/**
 * Safely extracts the category name from a Payload Category relationship.
 * Handles both populated Category objects and unpopulated IDs.
 */
export function getCategoryName(
	category: number | Category | null | undefined,
	fallback = "Uncategorized",
): string {
	if (!category) return fallback;
	if (typeof category === "number") return fallback; // Cannot get name from ID alone
	return category.name || fallback;
}

/**
 * Safely extracts the category slug from a Payload Category relationship.
 * Handles both populated Category objects and unpopulated IDs.
 */
export function getCategorySlug(
	category: number | Category | null | undefined,
): string | null {
	if (!category) return null;
	if (typeof category === "number") return null;
	return category.slug || null;
}

/**
 * Safely extracts the tag name from a Payload Tag relationship.
 * Handles both populated Tag objects and unpopulated IDs.
 */
export function getTagName(
	tag: number | Tag | null | undefined,
	fallback = "Tag",
): string {
	if (!tag) return fallback;
	if (typeof tag === "number") return fallback; // Cannot get name from ID alone
	return tag.name || fallback;
}
