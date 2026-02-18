/**
 * FilterSection Component
 *
 * Composition layer that renders the correct filter UI based on viewport:
 * - Desktop (md+): inline `ContentFilters` bar
 * - Mobile (<md): `ContentFilterSheet` bottom-sheet trigger
 *
 * Visibility rules:
 * - Desktop bar is shown when `showFilters` is true
 * - Mobile sheet is shown when either `showFilters` OR `showSearch` is true,
 *   so the search bar is always accessible on mobile even without category filters
 */

import type { CategoryOption, TagOption, ContentType } from "@/lib/content";
import { ContentFilters } from "./content-filters";
import { ContentFilterSheet } from "./content-filter-sheet";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface FilterSectionProps {
	categoryOptions: CategoryOption[];
	tagOptions: TagOption[];
	showSearch: boolean;
	showFilters: boolean;
	contentType: ContentType;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FilterSection({
	categoryOptions,
	tagOptions,
	showSearch,
	showFilters,
	contentType,
}: FilterSectionProps) {
	// Nothing to render if both filters and search are disabled
	if (!showFilters && !showSearch) {
		return null;
	}

	return (
		<>
			{/* Desktop: inline filter bar — only when showFilters is enabled */}
			{showFilters && (
				<div className="hidden md:block">
					<ContentFilters
						categoryOptions={categoryOptions}
						tagOptions={tagOptions}
						showSearch={showSearch}
						contentType={contentType}
					/>
				</div>
			)}

			{/* Mobile: bottom-sheet — shown when filters OR search is enabled */}
			<ContentFilterSheet
				categoryOptions={categoryOptions}
				tagOptions={tagOptions}
				showSearch={showSearch}
				contentType={contentType}
			/>
		</>
	);
}
