"use client";

import { cn } from "@/lib/utils";

interface TimelineProps {
	steps: {
		title: string;
		description: string;
		date?: string;
		id?: string;
	}[];
	className?: string;
}

export function Timeline({ steps, className }: TimelineProps) {
	return (
		<div
			className={cn(
				"my-8 ml-6 border-l-2 border-muted space-y-8 pl-8 not-prose",
				className,
			)}
		>
			{steps.map((step, index) => (
				<div key={step.id || index} className="relative">
					{/* Dot */}
					<div className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-background bg-muted-foreground/30" />

					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
							{step.date || `Phase ${index + 1}`}
						</span>
						<p className="text-lg font-bold text-foreground">{step.title}</p>
						<p className="text-muted-foreground leading-relaxed">
							{step.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
