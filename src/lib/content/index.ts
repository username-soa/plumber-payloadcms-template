/**
 * Content Library
 * Central export for content fetching utilities
 */

// Types & type guards
export * from "./types";

// Fetchers
export {
	getFilterOptions,
	resolveCategorySlug,
	resolveTagSlug,
} from "./fetchers/fetch-filters";
export {
	fetchContent,
	type FetchContentParams,
} from "./fetchers/fetch-content";

// Query Builders
export {
	buildWhereClause,
	buildSortClause,
	calculatePagination,
	calculateTotalPages,
} from "./queries/build-query";

// Search plugin mapping (single source of truth)
export {
	CONTENT_TYPE_TO_SEARCH_FILTER,
	type SearchFilterType,
} from "./search-type-map";
