import type { Media } from "@/payload-types";

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
