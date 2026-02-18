/**
 * InfiniteScroll Component
 *
 * Uses an `IntersectionObserver` to detect when the sentinel element at the
 * bottom of the list enters the viewport, then increments the `page` URL
 * query param to trigger a server re-fetch of the next page.
 *
 * Uses `useTransition` for the page update so React can keep the current
 * content visible while the next page is loading (no layout flash).
 *
 * This is a Client Component because it uses browser APIs and URL state.
 */

"use client";

import { useEffect, useRef, useCallback, useTransition } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { Loader, ChevronDown } from "lucide-react";
import { EndMessage } from "./end-message";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface InfiniteScrollProps {
	totalPages: number;
	totalItems: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InfiniteScroll({ totalPages, totalItems }: InfiniteScrollProps) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);
	// `isPending` is true while the page transition (URL update + server fetch) is in flight
	const [isPending, startTransition] = useTransition();

	const observerRef = useRef<HTMLDivElement>(null);
	const hasMore = page < totalPages;

	/** Increment the page inside a transition so the UI stays responsive */
	const loadMore = useCallback(() => {
		if (isPending || !hasMore) return;
		startTransition(() => {
			setPage(page + 1);
		});
	}, [page, setPage, isPending, hasMore]);

	// Observe the sentinel element; trigger loadMore when it enters the viewport
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isPending) {
					loadMore();
				}
			},
			{ threshold: 0.1 },
		);

		const sentinel = observerRef.current;
		if (sentinel) observer.observe(sentinel);
		return () => {
			if (sentinel) observer.unobserve(sentinel);
		};
	}, [loadMore, hasMore, isPending]);

	// Show the "end" message only after the user has scrolled past the first page
	const showEndMessage = !hasMore && page > 1;

	// Nothing to render when there are no more pages and no end message to show
	if (!hasMore && !isPending && !showEndMessage) return null;

	return (
		<div
			ref={observerRef}
			className="flex flex-col justify-center items-center py-8 min-h-[80px]"
		>
			{isPending ? (
				// Loading indicator while the next page is being fetched
				<div className="flex items-center gap-2 text-muted-foreground">
					<Loader className="w-6 h-6 animate-spin text-primary" />
					<span className="text-sm font-medium">Loading more...</span>
				</div>
			) : hasMore ? (
				// Scroll hint shown when the sentinel is visible but not yet loading
				<div className="flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
					<ChevronDown className="w-5 h-5" />
					<span className="text-xs">Scroll for more</span>
				</div>
			) : showEndMessage ? (
				<EndMessage totalItems={totalItems} />
			) : null}
		</div>
	);
}
