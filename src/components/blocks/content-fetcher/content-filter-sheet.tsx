/**
 * ContentFilterSheet Component
 *
 * Mobile-first filter panel rendered as a bottom sheet (using shadcn/ui Sheet).
 * Provides category and tag pill buttons and an optional SearchBar.
 *
 * This is a Client Component because it reads and writes URL search params.
 */

"use client";

import { useState, useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { CategoryOption, TagOption, ContentType } from "@/lib/content";
import { CONTENT_TYPE_TO_SEARCH_FILTER } from "@/lib/content";
import { SearchBar } from "@/components/ui/SearchBar";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ContentFilterSheetProps {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
	showSearch?: boolean;
	contentType: ContentType;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContentFilterSheet({
	categoryOptions,
	tagOptions,
	showSearch = true,
	contentType,
}: ContentFilterSheetProps) {
	const [open, setOpen] = useState(false);

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

	/**
	 * Toggle a category: selecting the same value again deselects it.
	 * Resets to page 1 on every change.
	 */
	const handleCategoryChange = useCallback(
		(value: string) => {
			const newValue = value === category ? null : value;
			setCategory(newValue === "all" ? null : newValue);
			setPage(1);
		},
		[category, setCategory, setPage],
	);

	/**
	 * Toggle a tag: selecting the same value again deselects it.
	 * Resets to page 1 on every change.
	 */
	const handleTagChange = useCallback(
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

	const hasActiveFilters = Boolean(category || tag);
	const activeFilterCount = [category, tag].filter(Boolean).length;
	// Map the ContentFetcher type to the search plugin's collection slug
	const filterType = CONTENT_TYPE_TO_SEARCH_FILTER[contentType];
	const searchPlaceholder = `Search ${contentType === "blogs" ? "blog posts" : contentType}…`;

	/** Shared pill button class builder */
	const pillClass = (active: boolean) =>
		`rounded-full transition-all ${
			active
				? "bg-primary text-white hover:bg-primary/90 border-transparent"
				: "border-muted-foreground/20 text-foreground hover:bg-muted"
		}`;

	return (
		<div className="md:hidden block mb-6">
			<div className="flex gap-3">
				<Sheet open={open} onOpenChange={setOpen}>
					{/* ── Trigger button ──────────────────────────────────────────── */}
					<SheetTrigger asChild>
						<Button variant="outline" className="flex-1 w-full justify-between h-10">
							<span className="flex items-center">
								<Filter className="w-4 h-4 mr-2" />
								Filters
							</span>
							{activeFilterCount > 0 && (
								<Badge variant="secondary" className="ml-2">
									{activeFilterCount}
								</Badge>
							)}
						</Button>
					</SheetTrigger>

					{/* ── Sheet panel ─────────────────────────────────────────────── */}
					<SheetContent
						side="bottom"
						className="w-full h-[90vh] sm:max-h-[90vh] p-0 flex flex-col gap-0 border-none rounded-t-[20px] focus:outline-none"
					>
						{/* Sticky header */}
						<div className="p-4 pb-0 flex flex-col items-center justify-center bg-background rounded-t-[20px] z-10 sticky top-0">
							{/* Drag handle */}
							<div className="w-12 h-1.5 bg-muted rounded-full mb-4" />
							<SheetTitle className="text-lg font-semibold w-full text-center">
								Filters
							</SheetTitle>
						</div>

						{/* Scrollable content */}
						<div className="flex-1 overflow-y-auto p-4 space-y-8 pb-24">
							<SheetDescription className="sr-only">
								Filter content options
							</SheetDescription>

							{/* Search */}
							{showSearch && filterType && (
								<div className="space-y-3">
									<Label className="text-base font-medium">Search</Label>
									<SearchBar
										filterType={filterType}
										placeholder={searchPlaceholder}
										className="w-full"
									/>
								</div>
							)}

							{/* Category pills */}
							<div className="space-y-3">
								<Label className="text-base font-medium">Category</Label>
								<div className="flex flex-wrap gap-3">
									<Button
										variant={!category ? "default" : "outline"}
										size="sm"
										onClick={() => handleCategoryChange("all")}
										className={pillClass(!category)}
									>
										All Categories
									</Button>
									{categoryOptions
										.filter((option) => option.value !== "all")
										.map((option) => (
											<Button
												key={option.value}
												variant={category === option.value ? "default" : "outline"}
												size="sm"
												onClick={() => handleCategoryChange(option.value)}
												className={pillClass(category === option.value)}
											>
												{option.label}
											</Button>
										))}
								</div>
							</div>

							{/* Tag pills — only shown when there are actual tag options beyond "All" */}
							{tagOptions.length > 1 && (
								<div className="space-y-3">
									<Label className="text-base font-medium">Tags</Label>
									<div className="flex flex-wrap gap-3">
										<Button
											variant={!tag ? "default" : "outline"}
											size="sm"
											onClick={() => handleTagChange("all")}
											className={pillClass(!tag)}
										>
											All Tags
										</Button>
										{tagOptions
											.filter((option) => option.value !== "all")
											.map((option) => (
												<Button
													key={option.value}
													variant={tag === option.value ? "default" : "outline"}
													size="sm"
													onClick={() => handleTagChange(option.value)}
													className={pillClass(tag === option.value)}
												>
													{option.label}
												</Button>
											))}
									</div>
								</div>
							)}
						</div>

						{/* Sticky footer actions */}
						<div className="p-4 border-t bg-background mt-auto sticky bottom-0 z-10 flex gap-3 pb-8">
							{hasActiveFilters && (
								<Button
									variant="outline"
									onClick={clearFilters}
									className="flex-1 h-12 rounded-xl border-muted-foreground/20"
								>
									<X className="w-4 h-4 mr-2" />
									Clear All
								</Button>
							)}
							<SheetTrigger asChild>
								<Button
									className="flex-1 h-12 rounded-xl"
									onClick={() => setOpen(false)}
								>
									Show Results
								</Button>
							</SheetTrigger>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
