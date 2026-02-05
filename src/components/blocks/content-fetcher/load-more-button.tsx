"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import EndMessage from "./end-message";

interface LoadMoreButtonProps {
	totalPages: number;
	totalItems: number;
}

export function LoadMoreButton({
	totalPages,
	totalItems,
}: LoadMoreButtonProps) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({ shallow: false }),
	);
	const [isPending, startTransition] = useTransition();

	const hasMore = page < totalPages;
	const showEndMessage = !hasMore && page > 1;

	const handleLoadMore = () => {
		startTransition(() => {
			setPage(page + 1);
		});
	};

	// Show end message when all content is loaded
	if (showEndMessage) {
		return <EndMessage totalItems={totalItems} />;
	}

	// Hide if no more pages and we haven't loaded any additional content
	if (!hasMore) return null;

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
					`Load More (${totalPages - page} more page${totalPages - page > 1 ? "s" : ""})`
				)}
			</Button>
		</div>
	);
}
