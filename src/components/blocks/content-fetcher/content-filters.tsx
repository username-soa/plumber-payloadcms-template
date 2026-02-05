"use client";

import { useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CategoryOption, TagOption } from "@/lib/content";

interface ContentFiltersProps {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
	showSearch?: boolean;
}

export function ContentFilters({
	categoryOptions,
	tagOptions,
	showSearch = true,
}: ContentFiltersProps) {
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
			setCategory(value === "all" ? null : value);
			setPage(1); // Reset to first page
		},
		[setCategory, setPage],
	);

	const handleTagChange = useCallback(
		(value: string) => {
			setTag(value === "all" ? null : value);
			setPage(1); // Reset to first page
		},
		[setTag, setPage],
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

	return (
		<div className="flex justify-between gap-3 md:mb-14 mb-8">
			<div className="flex gap-3">
				{/* Category Filter */}
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

				{/* Tag Filter - only show if there are tag options */}
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
				{/* Clear Filters */}
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={clearFilters}
						className="text-muted-foreground hover:text-foreground"
					>
						<X className="w-4 h-4 mr-1" />
						Clear
					</Button>
				)}
			</div>
			{/* Search Input */}
			{showSearch && (
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search..."
						value={search}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="pl-9"
					/>
				</div>
			)}
		</div>
	);
}
