/**
 * PaginationNumbered Component
 *
 * Renders a numbered page navigation bar that syncs with the `page` URL
 * query param via `nuqs`. Supports ellipsis truncation for large page counts.
 *
 * This is a Client Component because it reads and writes the `page` param.
 */

"use client";

import { useMemo } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PaginationNumberedProps {
	totalPages: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Generate the list of page numbers (and ellipsis placeholders) to display.
 * For ≤7 pages all numbers are shown; for larger counts the list is truncated
 * around the current page with "..." separators.
 */
function buildPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
	if (totalPages <= 7) {
		// Show every page when the total is small
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const pages: (number | "...")[] = [1];

	if (currentPage > 3) pages.push("...");

	// Window of pages around the current page
	const start = Math.max(2, currentPage - 1);
	const end = Math.min(totalPages - 1, currentPage + 1);
	for (let i = start; i <= end; i++) {
		if (!pages.includes(i)) pages.push(i);
	}

	if (currentPage < totalPages - 2) pages.push("...");
	if (!pages.includes(totalPages)) pages.push(totalPages);

	return pages;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PaginationNumbered({ totalPages }: PaginationNumberedProps) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);

	// Memoised so the page number list is only recalculated when page or
	// totalPages actually changes — not on every parent re-render
	const pageNumbers = useMemo(() => buildPageNumbers(page, totalPages), [page, totalPages]);

	// Nothing to render for a single page
	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			{/* Previous */}
			<Button
				variant="outline"
				size="icon"
				disabled={page <= 1}
				onClick={() => setPage(page - 1)}
				aria-label="Previous page"
			>
				<ChevronLeft className="w-4 h-4" />
			</Button>

			{/* Page numbers */}
			<div className="flex items-center gap-1">
				{pageNumbers.map((pageNum, index) =>
					pageNum === "..." ? (
						<span
							key={`ellipsis-${index}`}
							className="px-2 text-muted-foreground"
							aria-hidden="true"
						>
							…
						</span>
					) : (
						<Button
							key={pageNum}
							variant={page === pageNum ? "default" : "outline"}
							size="icon"
							onClick={() => setPage(pageNum)}
							aria-label={`Page ${pageNum}`}
							aria-current={page === pageNum ? "page" : undefined}
						>
							{pageNum}
						</Button>
					),
				)}
			</div>

			{/* Next */}
			<Button
				variant="outline"
				size="icon"
				disabled={page >= totalPages}
				onClick={() => setPage(page + 1)}
				aria-label="Next page"
			>
				<ChevronRight className="w-4 h-4" />
			</Button>
		</div>
	);
}
