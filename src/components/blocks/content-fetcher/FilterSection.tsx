/**
 * FilterSection Component
 * Composition component for desktop and mobile filters
 */

import type { CategoryOption, TagOption } from "@/lib/content";
import { ContentFilters } from "./content-filters";
import { ContentFilterSheet } from "./content-filter-sheet";

interface FilterSectionProps {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
	showSearch: boolean;
	showFilters: boolean;
}

export function FilterSection({
	categoryOptions,
	tagOptions,
	showSearch,
	showFilters,
}: FilterSectionProps) {
	if (!showFilters) {
		return null;
	}

	return (
		<>
			{/* Desktop filters - hidden on mobile */}
			<div className="hidden md:block">
				<ContentFilters
					categoryOptions={categoryOptions}
					tagOptions={tagOptions}
					showSearch={showSearch}
				/>
			</div>
			{/* Mobile filter sheet */}
			<ContentFilterSheet
				categoryOptions={categoryOptions}
				tagOptions={tagOptions}
				showSearch={showSearch}
			/>
		</>
	);
}
