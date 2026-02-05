"use client";

import { useState, useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import type { CategoryOption, TagOption } from "@/lib/content";

interface ContentFilterSheetProps {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
	showSearch?: boolean;
}

export function ContentFilterSheet({
	categoryOptions,
	tagOptions,
	showSearch = true,
}: ContentFilterSheetProps) {
	const [open, setOpen] = useState(false);

	const [category, setCategory] = useQueryState(
		"category",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	const [tag, setTag] = useQueryState(
		"tag",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	const [search, setSearch] = useQueryState(
		"search",
		parseAsString.withDefault("").withOptions({ shallow: false }),
	);
	const [, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);

	const handleCategoryChange = useCallback(
		(value: string) => {
			const newValue = value === category ? null : value; // Toggle effect for better UX
			setCategory(newValue === "all" ? null : newValue);
			setPage(1);
		},
		[category, setCategory, setPage],
	);

	const handleTagChange = useCallback(
		(value: string) => {
			const newValue = value === tag ? null : value; // Toggle effect
			setTag(newValue === "all" ? null : newValue);
			setPage(1);
		},
		[tag, setTag, setPage],
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearch(value || null);
			setPage(1);
		},
		[setSearch, setPage],
	);

	const clearFilters = useCallback(() => {
		setCategory(null);
		setTag(null);
		setSearch(null);
		setPage(1);
	}, [setCategory, setTag, setSearch, setPage]);

	const hasActiveFilters = category || tag || search;
	const activeFilterCount = [category, tag, search].filter(Boolean).length;

	return (
		<div className="md:hidden block mb-6">
			<div className="flex gap-3">
				<Sheet open={open} onOpenChange={setOpen}>
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
					<SheetContent
						side="bottom"
						className="w-full h-[90vh] sm:max-h-[90vh] p-0 flex flex-col gap-0 border-none rounded-t-[20px] focus:outline-none"
					>
						<div className="p-4 pb-0 flex flex-col items-center justify-center bg-background rounded-t-[20px] z-10 sticky top-0">
							{/* Drag Handle */}
							<div className="w-12 h-1.5 bg-muted rounded-full mb-4" />
							<SheetTitle className="text-lg font-semibold w-full text-center">
								Filters
							</SheetTitle>
						</div>

						<div className="flex-1 overflow-y-auto p-4 space-y-8 pb-24">
							<SheetDescription className="sr-only">
								Filter content options
							</SheetDescription>

							{/* Search */}
							{showSearch && (
								<div className="space-y-3">
									<Label className="text-base font-medium">Search</Label>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
										<Input
											type="text"
											placeholder="Search content..."
											value={search || ""}
											onChange={(e) => handleSearchChange(e.target.value)}
											className="pl-10 h-12 text-base rounded-xl"
										/>
									</div>
								</div>
							)}

							{/* Category */}
							<div className="space-y-3">
								<Label className="text-base font-medium">Category</Label>
								<div className="flex flex-wrap gap-3">
									<Button
										variant={!category ? "default" : "outline"}
										size="sm"
										onClick={() => handleCategoryChange("all")}
										className={
											!category
												? "rounded-full bg-primary text-white hover:bg-primary/90"
												: "rounded-full border-muted-foreground/20 text-foreground hover:bg-muted"
										}
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
												onClick={() => handleCategoryChange(option.value)}
												className={`rounded-full transition-all ${
													category === option.value
														? "bg-primary text-white hover:bg-primary/90 border-transparent"
														: "border-muted-foreground/20 text-foreground hover:bg-muted"
												}`}
											>
												{option.label}
											</Button>
										))}
								</div>
							</div>

							{/* Tag - only show if there are tag options */}
							{tagOptions.length > 1 && (
								<div className="space-y-3">
									<Label className="text-base font-medium">Tags</Label>
									<div className="flex flex-wrap gap-3">
										<Button
											variant={!tag ? "default" : "outline"}
											size="sm"
											onClick={() => handleTagChange("all")}
											className={
												!tag
													? "rounded-full bg-primary text-white hover:bg-primary/90"
													: "rounded-full border-muted-foreground/20 text-foreground hover:bg-muted"
											}
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
													className={`rounded-full transition-all ${
														tag === option.value
															? "bg-primary text-white hover:bg-primary/90 border-transparent"
															: "border-muted-foreground/20 text-foreground hover:bg-muted"
													}`}
												>
													{option.label}
												</Button>
											))}
									</div>
								</div>
							)}
						</div>

						{/* Fixed Footer for Actions */}
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
