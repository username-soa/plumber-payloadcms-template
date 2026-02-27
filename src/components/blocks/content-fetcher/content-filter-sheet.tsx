/**
 * ContentFilterSheet Component
 *
 * Mobile-first filter panel rendered as a bottom sheet (using shadcn/ui Sheet).
 * Provides category and tag pill buttons and an optional SearchBar.
 *
 * This is a Client Component because it reads and writes URL search params.
 * All filter state is managed by the shared `useContentFilters` hook.
 */

"use client";

import { useState } from "react";
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
import { cn } from "@/lib/utils";
import type { CategoryOption, TagOption, ContentType } from "@/lib/content";
import { SearchBar } from "@/components/ui/SearchBar";
import { useContentFilters } from "./use-content-filters";

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

	const {
		category,
		tag,
		handleCategoryToggle,
		handleTagToggle,
		clearFilters,
		hasActiveFilters,
		activeFilterCount,
		filterType,
		searchPlaceholder,
	} = useContentFilters(contentType);

	return (
		<div className="md:hidden block mb-6">
			<div className="flex gap-3">
				<Sheet open={open} onOpenChange={setOpen}>
					{/* ── Trigger button ──────────────────────────────────────────── */}
					<SheetTrigger asChild>
						<Button
							variant="outline"
							className="flex-1 w-full justify-between h-10"
						>
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
										onClick={() => handleCategoryToggle("all")}
										className={cn(
											"rounded-full transition-all",
											!category
												? "bg-primary text-white hover:bg-primary/90 border-transparent"
												: "border-muted-foreground/20 text-foreground hover:bg-muted",
										)}
									>
										All Categories
									</Button>
									{categoryOptions
										.filter((option) => option.value !== "all")
										.map((option) => (
											<Button
												key={option.value}
												variant={
													category === option.value ? "default" : "outline"
												}
												size="sm"
												onClick={() => handleCategoryToggle(option.value)}
												className={cn(
													"rounded-full transition-all",
													category === option.value
														? "bg-primary text-white hover:bg-primary/90 border-transparent"
														: "border-muted-foreground/20 text-foreground hover:bg-muted",
												)}
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
											onClick={() => handleTagToggle("all")}
											className={cn(
												"rounded-full transition-all",
												!tag
													? "bg-primary text-white hover:bg-primary/90 border-transparent"
													: "border-muted-foreground/20 text-foreground hover:bg-muted",
											)}
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
													onClick={() => handleTagToggle(option.value)}
													className={cn(
														"rounded-full transition-all",
														tag === option.value
															? "bg-primary text-white hover:bg-primary/90 border-transparent"
															: "border-muted-foreground/20 text-foreground hover:bg-muted",
													)}
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
