/**
 * ContentFilters Component
 *
 * Desktop filter bar rendered above the content grid. Provides category and tag
 * dropdowns (backed by URL query params via `nuqs`) and an optional SearchBar.
 *
 * This is a Client Component because it reads and writes URL search params.
 */

"use client";

import { useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CategoryOption, TagOption, ContentType } from "@/lib/content";
import { CONTENT_TYPE_TO_SEARCH_FILTER } from "@/lib/content";
import { SearchBar } from "@/components/ui/SearchBar";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ContentFiltersProps {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
	showSearch?: boolean;
	contentType: ContentType;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContentFilters({
	categoryOptions,
	tagOptions,
	showSearch = true,
	contentType,
}: ContentFiltersProps) {
	// Sync filter state with URL query params (triggers server re-fetch via nuqs)
	const [category, setCategory] = useQueryState(
		"category",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	const [tag, setTag] = useQueryState(
		"tag",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	// We only write to `page` (reset to 1 on filter change) — we don't read it here
	const [, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);

	/** Select a category and reset to page 1 */
	const handleCategoryChange = useCallback(
		(value: string) => {
			setCategory(value === "all" ? null : value);
			setPage(1);
		},
		[setCategory, setPage],
	);

	/** Select a tag and reset to page 1 */
	const handleTagChange = useCallback(
		(value: string) => {
			setTag(value === "all" ? null : value);
			setPage(1);
		},
		[setTag, setPage],
	);

	/** Clear all active filters and reset to page 1 */
	const clearFilters = useCallback(() => {
		setCategory(null);
		setTag(null);
		setPage(1);
	}, [setCategory, setTag, setPage]);

	const hasActiveFilters = Boolean(category || tag);
	// Map the ContentFetcher type to the search plugin's collection slug
	const filterType = CONTENT_TYPE_TO_SEARCH_FILTER[contentType];
	const searchPlaceholder = `Search ${contentType === "blogs" ? "blog posts" : contentType}…`;

	return (
		<div className="flex justify-between gap-3 md:mb-14 mb-8">
			{/* ── Filter dropdowns ──────────────────────────────────────────────── */}
			<div className="flex gap-3">
				{/* Category */}
				<Select value={category || "all"} onValueChange={handleCategoryChange}>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						{categoryOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Tag — only shown when there are actual tag options beyond "All" */}
				{tagOptions.length > 1 && (
					<Select value={tag || "all"} onValueChange={handleTagChange}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Tag" />
						</SelectTrigger>
						<SelectContent>
							{tagOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}

				{/* Clear button — only shown when at least one filter is active */}
				{hasActiveFilters && (
					<Button
						variant="secondary"
						onClick={clearFilters}
						className="text-muted-foreground hover:text-foreground"
					>
						<X className="w-4 h-4 mr-1" />
						Clear
					</Button>
				)}
			</div>

			{/* ── Search bar ────────────────────────────────────────────────────── */}
			{showSearch && filterType && (
				<SearchBar
					filterType={filterType}
					placeholder={searchPlaceholder}
					className="max-w-xs"
				/>
			)}
		</div>
	);
}
