/**
 * ContentFilters Component
 *
 * Desktop filter bar rendered above the content grid. Provides category and tag
 * dropdowns (backed by URL query params via `nuqs`) and an optional SearchBar.
 *
 * This is a Client Component because it reads and writes URL search params.
 * All filter state is managed by the shared `useContentFilters` hook.
 */

"use client";

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
import { SearchBar } from "@/components/ui/SearchBar";
import { useContentFilters } from "./use-content-filters";

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
	const {
		category,
		tag,
		handleCategoryChange,
		handleTagChange,
		clearFilters,
		hasActiveFilters,
		filterType,
		searchPlaceholder,
	} = useContentFilters(contentType);

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
