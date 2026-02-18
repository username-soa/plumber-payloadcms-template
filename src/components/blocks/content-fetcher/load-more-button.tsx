/**
 * LoadMoreButton Component
 *
 * Renders a "Load More" button that increments the `page` URL query param
 * to trigger a server re-fetch of the next batch of items. Uses `useTransition`
 * so the button shows a loading state while the fetch is in flight.
 *
 * When all pages have been loaded it renders the `EndMessage` instead.
 *
 * This is a Client Component because it reads and writes the `page` param.
 */

"use client";

import { useCallback, useTransition } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EndMessage } from "./end-message";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface LoadMoreButtonProps {
	totalPages: number;
	totalItems: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LoadMoreButton({ totalPages, totalItems }: LoadMoreButtonProps) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);
	// `isPending` is true while the page transition (URL update + server fetch) is in flight
	const [isPending, startTransition] = useTransition();

	const hasMore = page < totalPages;
	const showEndMessage = !hasMore && page > 1;

	/** Increment the page inside a transition so the UI stays responsive */
	const handleLoadMore = useCallback(() => {
		startTransition(() => {
			setPage(page + 1);
		});
	}, [page, setPage]);

	// Show end message when all content has been loaded
	if (showEndMessage) {
		return <EndMessage totalItems={totalItems} />;
	}

	// Hide when there are no more pages and we haven't loaded any additional content
	if (!hasMore) return null;

	const remainingPages = totalPages - page;

	return (
		<div className="flex justify-center mt-8">
			<Button
				variant="outline"
				size="lg"
				onClick={handleLoadMore}
				disabled={isPending}
				className="min-w-[200px]"
			>
				{isPending ? (
					<>
						<Loader className="w-4 h-4 mr-2 animate-spin" />
						Loading...
					</>
				) : (
					`Load More (${remainingPages} more page${remainingPages > 1 ? "s" : ""})`
				)}
			</Button>
		</div>
	);
}
