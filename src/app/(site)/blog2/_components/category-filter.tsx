"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
	categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const activeCategory = searchParams.get("category");

	const setActiveCategory = useCallback(
		(category: string | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (category === null) {
				params.delete("category");
			} else {
				params.set("category", category);
			}
			const query = params.toString();
			router.push(query ? `${pathname}?${query}` : pathname);
		},
		[searchParams, router, pathname],
	);

	return (
		<div className="flex flex-wrap gap-2">
			<Badge
				variant={activeCategory === null ? "default" : "outline"}
				className={cn(
					"cursor-pointer transition-all hover:scale-105 px-4 py-2 text-sm",
					activeCategory === null
						? "bg-primary text-primary-foreground"
						: "hover:bg-primary/10",
				)}
				onClick={() => setActiveCategory(null)}
			>
				All Posts
			</Badge>
			{categories.map((category) => (
				<Badge
					key={category}
					variant={activeCategory === category ? "default" : "outline"}
					className={cn(
						"cursor-pointer transition-all hover:scale-105 px-4 py-2 text-sm",
						activeCategory === category
							? "bg-primary text-primary-foreground"
							: "hover:bg-primary/10",
					)}
					onClick={() => setActiveCategory(category)}
				>
					{category}
				</Badge>
			))}
		</div>
	);
}
