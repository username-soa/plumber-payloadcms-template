/**
 * Search Type Map
 *
 * Maps the internal ContentType slugs (used by the ContentFetcher data layer)
 * to the collection slugs used by the Payload search plugin.
 *
 * This is the single source of truth — previously duplicated in both
 * `content-filters.tsx` and `content-filter-sheet.tsx`.
 */

import type { ContentType } from "./types";

/** Valid filter types accepted by the SearchBar component */
export type SearchFilterType = "blog-posts" | "case-studies" | "services" | "faqs";

/**
 * Maps a ContentFetcher `ContentType` to the corresponding search plugin
 * collection slug. Returns `undefined` for content types that have no
 * dedicated search filter (e.g. future types not yet indexed).
 */
export const CONTENT_TYPE_TO_SEARCH_FILTER: Record<ContentType, SearchFilterType | undefined> = {
	blogs: "blog-posts",
	"case-studies": "case-studies",
	services: "services",
} as const;
