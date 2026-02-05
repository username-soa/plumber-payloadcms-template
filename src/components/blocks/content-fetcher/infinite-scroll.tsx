"use client";

import { useEffect, useRef, useCallback, useTransition, useState } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { Loader, ChevronDown } from "lucide-react";
import EndMessage from "./end-message";

interface InfiniteScrollProps {
	totalPages: number;
	totalItems: number;
}

export function InfiniteScroll({
	totalPages,
	totalItems,
}: InfiniteScrollProps) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState(false);
	const observerRef = useRef<HTMLDivElement>(null);

	const hasMore = page < totalPages;

	const loadMore = useCallback(() => {
		if (isPending || isLoading || !hasMore) return;
		setIsLoading(true);
		startTransition(() => {
			setPage(page + 1);
		});
	}, [page, setPage, isPending, isLoading, hasMore]);

	// Reset loading state when page changes (after navigation completes)
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional - page triggers effect, not read inside
	useEffect(() => {
		setIsLoading(false);
	}, [page]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isPending && !isLoading) {
					loadMore();
				}
			},
			{ threshold: 0.1 },
		);

		const currentRef = observerRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [loadMore, hasMore, isPending, isLoading]);

	// Only show if loading, has more, or we've loaded additional pages (to show "end" message)
	const showEndMessage = !hasMore && page > 1;

	if (!hasMore && !isLoading && !showEndMessage) return null;

	return (
		<div
			ref={observerRef}
			className="flex flex-col justify-center items-center py-8 min-h-[80px]"
		>
			{isLoading || isPending ? (
				<div className="flex items-center gap-2 text-muted-foreground">
					<Loader className="w-6 h-6 animate-spin text-primary" />
					<span className="text-sm font-medium">Loading more...</span>
				</div>
			) : hasMore ? (
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
