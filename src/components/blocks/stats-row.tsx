"use client";

import { StatCard } from "./stat-card";
import { cn } from "@/lib/utils";

interface StatsRowProps {
	stats: {
		value: string;
		label: string;
		icon?: string;
	}[];
	className?: string;
}

export function StatsRow({ stats, className }: StatsRowProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-8",
				className,
			)}
		>
			{stats.map((stat, index) => (
				<StatCard
					key={`${stat.value}-${stat.label}`}
					value={stat.value}
					label={stat.label}
					icon={stat.icon}
					index={index}
					total={stats.length}
				/>
			))}
		</div>
	);
}
