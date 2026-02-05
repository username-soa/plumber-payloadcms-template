"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationNumberedProps {
	totalPages: number;
}

export function PaginationNumbered({ totalPages }: PaginationNumberedProps) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);

	if (totalPages <= 1) return null;

	const currentPage = page;

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages: (number | "...")[] = [];
		const showEllipsisAfter = currentPage < totalPages - 2;
		const showEllipsisBefore = currentPage > 3;

		if (totalPages <= 7) {
			// Show all pages if 7 or fewer
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			if (showEllipsisBefore) {
				pages.push("...");
			}

			// Show pages around current
			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) {
				if (!pages.includes(i)) {
					pages.push(i);
				}
			}

			if (showEllipsisAfter) {
				pages.push("...");
			}

			// Always show last page
			if (!pages.includes(totalPages)) {
				pages.push(totalPages);
			}
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			{/* Previous Button */}
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage <= 1}
				onClick={() => setPage(currentPage - 1)}
				aria-label="Previous page"
			>
				<ChevronLeft className="w-4 h-4" />
			</Button>

			{/* Page Numbers */}
			<div className="flex items-center gap-1">
				{pageNumbers.map((pageNum, index) =>
					pageNum === "..." ? (
						<span
							key={`ellipsis-after-${pageNumbers[index - 1]}`}
							className="px-2 text-muted-foreground"
						>
							...
						</span>
					) : (
						<Button
							key={pageNum}
							variant={currentPage === pageNum ? "default" : "outline"}
							size="icon"
							onClick={() => setPage(pageNum)}
							aria-label={`Page ${pageNum}`}
							aria-current={currentPage === pageNum ? "page" : undefined}
						>
							{pageNum}
						</Button>
					),
				)}
			</div>

			{/* Next Button */}
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage >= totalPages}
				onClick={() => setPage(currentPage + 1)}
				aria-label="Next page"
			>
				<ChevronRight className="w-4 h-4" />
			</Button>
		</div>
	);
}
