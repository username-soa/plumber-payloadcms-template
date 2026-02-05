/**
 * ContentGrid Component
 * Pure presentational grid component for displaying content items
 */
import type { ReactNode } from "react";
import { TypographyMuted } from "@/components/ui/typography";
import type { GridColumns } from "@/lib/content";
import { GRID_COLS_MAP } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { ContentType } from "@/lib/content";

interface ContentGridProps<T> {
	items: T[];
	itemsPerRow?: GridColumns | null;
	renderCard: (item: T, index: number) => ReactNode;
	emptyMessage?: string;
	contentType?: ContentType;
}

export function ContentGrid<T>({
	items,
	contentType,
	itemsPerRow = "3",
	renderCard,
	emptyMessage = "No items found. Try adjusting your filters.",
}: ContentGridProps<T>) {
	const gridCols = GRID_COLS_MAP[itemsPerRow || "3"];

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
							"flex flex-wrap gap-px bg-border overflow-hidden",
							// Default (Mobile - 1 col)
							"[&>div]:w-full [&>div]:grow",
							// 2 Columns (MD)
							(itemsPerRow === "2" ||
								itemsPerRow === "3" ||
								itemsPerRow === "4") &&
								"md:[&>div]:w-[calc(50%-0.5px)]",
							// 3 Columns (LG)
							itemsPerRow === "3" && "lg:[&>div]:w-[calc(33.333%-0.67px)]",
							// 4 Columns (LG)
							itemsPerRow === "4" && "lg:[&>div]:w-[calc(25%-0.75px)]",
							// Featured items override
							"[&>div.col-span-full]:w-full",
						)
					: `grid ${gridCols} gap-x-6 md:gap-y-14 gap-y-6`,
			)}
		>
			{items.map((item, index) => renderCard(item, index))}
		</div>
	);
}
