/**
 * ContentGrid Component
 *
 * Pure presentational grid that renders a list of content items using a
 * caller-supplied `renderCard` function. Handles both the standard CSS grid
 * layout (blogs, case-studies) and the border-separated tile layout (services).
 *
 * This is a Server Component — it has no client-side state or effects.
 *
 * @prop items       - Array of content items to render
 * @prop itemsPerRow - Number of columns in the grid (1 | 2 | 3 | 4)
 * @prop renderCard  - Factory function: (item, index) => ReactNode
 * @prop emptyMessage - Message shown when `items` is empty
 * @prop contentType  - Used to switch between grid layouts
 */

import type { ReactNode } from "react";
import { TypographyMuted } from "@/components/ui/typography";
import type { GridColumns, ContentType } from "@/lib/content/types";
import { GRID_COLS_MAP } from "@/lib/content/types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ContentGridProps<T> {
	items: T[];
	itemsPerRow?: GridColumns | null;
	renderCard: (item: T, index: number) => ReactNode;
	emptyMessage?: string;
	contentType?: ContentType;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContentGrid<T>({
	items,
	contentType,
	itemsPerRow = "3",
	renderCard,
	emptyMessage = "No items found. Try adjusting your filters.",
}: ContentGridProps<T>) {
	const gridCols = GRID_COLS_MAP[itemsPerRow ?? "3"];

	// Empty state
	if (items.length === 0) {
		return (
			<div className="text-center py-12">
				<TypographyMuted className="text-lg">{emptyMessage}</TypographyMuted>
			</div>
		);
	}

	return (
		<div
			className={cn(
				contentType === "services"
					? cn(
							// Services use a border-separated tile layout instead of a gap-based grid
							"flex flex-wrap gap-px bg-border overflow-hidden",
							// Mobile: single column
							"[&>div]:w-full [&>div]:grow",
							// 2 columns at md breakpoint
							(itemsPerRow === "2" ||
								itemsPerRow === "3" ||
								itemsPerRow === "4") &&
								"md:[&>div]:w-[calc(50%-0.5px)]",
							// 3 columns at lg breakpoint
							itemsPerRow === "3" && "lg:[&>div]:w-[calc(33.333%-0.67px)]",
							// 4 columns at lg breakpoint
							itemsPerRow === "4" && "lg:[&>div]:w-[calc(25%-0.75px)]",
							// Featured items always span full width
							"[&>div.col-span-full]:w-full",
						)
					: // Standard CSS grid for blogs and case-studies
						`grid ${gridCols} gap-x-6 md:gap-y-14 gap-y-6`,
			)}
		>
			{items.map((item, index) => renderCard(item, index))}
		</div>
	);
}
