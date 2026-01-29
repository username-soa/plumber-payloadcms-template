"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
	Clock,
	Droplets,
	Home,
	Shield,
	Star,
	ThumbsUp,
	Timer,
	TrendingUp,
	Users,
	Wrench,
} from "lucide-react";

// Map of allowed icon names to their components for tree shaking
const iconMap: Record<string, LucideIcon> = {
	Clock,
	Droplets,
	Home,
	Shield,
	Star,
	ThumbsUp,
	Timer,
	TrendingUp,
	Users,
	Wrench,
};

interface StatCardProps {
	value: string;
	label: string;
	icon?: string;
	className?: string;
	index?: number;
	total?: number;
}

export function StatCard({
	value,
	label,
	icon,
	className,
	index = 0,
	total = 1,
}: StatCardProps) {
	const Icon = icon ? iconMap[icon] : null;

	// Determine if this is the last item in a row for each breakpoint
	// Mobile: 1 column (always last in row)
	// SM: 2 columns (index % 2 === 1 is last)
	// LG: 3 columns (index % 3 === 2 is last)
	const isLastInRowMobile = true; // Always last in 1-col layout
	const isLastInRowSm = (index + 1) % 2 === 0 || index === total - 1;
	const isLastInRowLg = (index + 1) % 3 === 0 || index === total - 1;

	// Determine if this is in the last row for each breakpoint
	const isLastRowMobile = index === total - 1;
	const isLastRowSm = index >= total - (total % 2 === 0 ? 2 : total % 2);
	const isLastRowLg = index >= total - (total % 3 === 0 ? 3 : total % 3);

	return (
		<div
			className={cn(
				"p-6 flex flex-col items-center justify-center text-center border-border/50",
				// Border right: hide on mobile (1 col), conditionally on sm/lg
				!isLastInRowMobile && "border-r",
				isLastInRowSm ? "sm:border-r-0" : "sm:border-r",
				isLastInRowLg ? "lg:border-r-0" : "lg:border-r",
				// Border bottom: hide in last row for each breakpoint
				!isLastRowMobile && "border-b",
				isLastRowSm ? "sm:border-b-0" : "sm:border-b",
				isLastRowLg ? "lg:border-b-0" : "lg:border-b",
				className,
			)}
		>
			{Icon && <Icon className="w-8 h-8 text-primary mb-3" />}
			<div className="text-3xl font-bold text-primary mb-1">{value}</div>
			<div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
				{label}
			</div>
		</div>
	);
}
