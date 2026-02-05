/**
 * Content Fetcher Types
 * Shared types for the content fetching data layer
 */

import type { BlogPost, CaseStudy, Service } from "@/payload-types";

// =============================================================================
// Content Type Definitions
// =============================================================================

export type ContentType = "blogs" | "case-studies" | "services";
export type SortOption = "newest" | "oldest" | "titleAsc" | "titleDesc";
export type PaginationStyle =
	| "none"
	| "numbered"
	| "loadMore"
	| "infiniteScroll";
export type GridColumns = "1" | "2" | "3" | "4";

// Union type for all content items
export type ContentItem = BlogPost | CaseStudy | Service;

// =============================================================================
// Filter Option Types
// =============================================================================

export interface FilterOption {
	label: string;
	value: string;
}

// Re-export for backwards compatibility
export type CategoryOption = FilterOption;
export type TagOption = FilterOption;

// =============================================================================
// Query Parameter Types
// =============================================================================

export interface ContentQueryParams {
	contentType: ContentType;
	page: number;
	limit: number;
	sortBy: SortOption;
	category?: string;
	tag?: string;
	search?: string;
	featuredOnly?: boolean;
}

export interface SearchParams {
	page?: string;
	category?: string;
	tag?: string;
	search?: string;
}

// =============================================================================
// Result Types
// =============================================================================

export interface ContentResult<T = ContentItem> {
	items: T[];
	totalPages: number;
	totalDocs: number;
	page: number;
}

export interface FilterOptions {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
}

// =============================================================================
// Collection Slug Mapping
// =============================================================================

export const COLLECTION_SLUG_MAP: Record<ContentType, string> = {
	blogs: "blog-posts",
	"case-studies": "case-studies",
	services: "services",
} as const;

// =============================================================================
// Grid Column CSS Classes
// =============================================================================

export const GRID_COLS_MAP: Record<GridColumns, string> = {
	"1": "grid-cols-1",
	"2": "grid-cols-1 md:grid-cols-2",
	"3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
	"4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

// =============================================================================
// Default Service Filter Options (hardcoded)
// =============================================================================

export const SERVICE_CATEGORY_OPTIONS: CategoryOption[] = [
	{ label: "All Services", value: "all" },
	{ label: "Emergency Only", value: "emergency" },
	{ label: "Main Services", value: "main" },
];
