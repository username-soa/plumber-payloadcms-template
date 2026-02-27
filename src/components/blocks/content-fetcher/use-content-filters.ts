/**
 * useContentFilters — Shared filter state hook
 *
 * Centralizes the URL query-param state (category, tag, page) and the derived
 * handlers that were previously duplicated between `content-filters.tsx` (desktop)
 * and `content-filter-sheet.tsx` (mobile).
 *
 * Both components import this and use the returned values directly.
 */

"use client";

import { useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import type { ContentType } from "@/lib/content";
import { CONTENT_TYPE_TO_SEARCH_FILTER } from "@/lib/content";

// =============================================================================
// Hook
// =============================================================================

export function useContentFilters(contentType: ContentType) {
	// Sync filter state with URL query params — shallow: false triggers a
	// server re-fetch of the ContentFetcher when params change
	const [category, setCategory] = useQueryState(
		"category",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	const [tag, setTag] = useQueryState(
		"tag",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	// Written only (reset to 1 on every filter change)
	const [, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);

	// ---------------------------------------------------------------------------
	// Handlers
	// ---------------------------------------------------------------------------

	/** Select a category and reset pagination to page 1 */
	const handleCategoryChange = useCallback(
		(value: string) => {
			setCategory(value === "all" ? null : value);
			setPage(1);
		},
		[setCategory, setPage],
	);

	/** Toggle a category (mobile pill UX): selecting the same value deselects it */
	const handleCategoryToggle = useCallback(
		(value: string) => {
			const newValue = value === category ? null : value;
			setCategory(newValue === "all" ? null : newValue);
			setPage(1);
		},
		[category, setCategory, setPage],
	);

	/** Select a tag and reset pagination to page 1 */
	const handleTagChange = useCallback(
		(value: string) => {
			setTag(value === "all" ? null : value);
			setPage(1);
		},
		[setTag, setPage],
	);

	/** Toggle a tag (mobile pill UX): selecting the same value deselects it */
	const handleTagToggle = useCallback(
		(value: string) => {
			const newValue = value === tag ? null : value;
			setTag(newValue === "all" ? null : newValue);
			setPage(1);
		},
		[tag, setTag, setPage],
	);

	/** Clear all active filters and reset to page 1 */
	const clearFilters = useCallback(() => {
		setCategory(null);
		setTag(null);
		setPage(1);
	}, [setCategory, setTag, setPage]);

	// ---------------------------------------------------------------------------
	// Derived state
	// ---------------------------------------------------------------------------

	const hasActiveFilters = Boolean(category || tag);
	const activeFilterCount = [category, tag].filter(Boolean).length;
	const filterType = CONTENT_TYPE_TO_SEARCH_FILTER[contentType];
	const searchPlaceholder = `Search ${contentType === "blogs" ? "blog posts" : contentType}…`;

	return {
		// State
		category,
		tag,
		// Handlers
		handleCategoryChange,
		handleCategoryToggle,
		handleTagChange,
		handleTagToggle,
		clearFilters,
		// Derived
		hasActiveFilters,
		activeFilterCount,
		filterType,
		searchPlaceholder,
	};
}
