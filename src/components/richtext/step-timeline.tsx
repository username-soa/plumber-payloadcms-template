"use client";

import { cn } from "@/lib/utils";

interface StepTimelineItem {
	label?: string | null;
	heading: string;
	content?: string | null;
	id?: string | null;
}

interface StepTimelineProps {
	items: StepTimelineItem[];
	paddingTop?: boolean;
	paddingBottom?: boolean;
	className?: string;
}

/**
 * A simple step-by-step timeline for blog posts and case studies.
 * Features a clean left-aligned design with customizable labels.
 */
export function StepTimeline({
	items,
	paddingTop,
	paddingBottom,
	className,
}: StepTimelineProps) {
	if (!items || items.length === 0) return null;

	return (
		<div
			className={cn(
				paddingTop && "pt-10 md:pt-16",
				paddingBottom && "pb-10 md:pb-16",
				className,
			)}
		>
			<div className="relative">
				{/* Vertical line */}
				<div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-border" />

				{/* Items */}
				<div className="space-y-8">
					{items.map((item, index) => (
						<div key={item.id || index} className="relative pl-8">
							{/* Dot */}
							<div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-muted-foreground/40" />

							{/* Content */}
							<div>
								{item.label && (
									<span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
										{item.label}
									</span>
								)}
								<h4 className="text-lg font-bold text-foreground mb-1">
									{item.heading}
								</h4>
								{item.content && (
									<p className="text-sm text-muted-foreground leading-relaxed">
										{item.content}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
