"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TypographyH3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
	SectionWrapper,
	type PaddingOption,
} from "@/components/ui/section-wrapper";

interface TimelineItem {
	title: string;
	date: string;
	description?: string | null;
	id?: string | null;
}

interface TimelineProps {
	title?: string;
	items?: TimelineItem[] | null;
	className?: string;
	paddingTopOption?: string | null;
	paddingBottomOption?: string | null;
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
}

export function Timeline({
	title,
	items,
	className,
	paddingTopOption,
	paddingBottomOption,
	background,
}: TimelineProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Track scroll progress of the timeline container relative to viewport
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"],
	});

	// Transform scroll progress to line height percentage
	const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	if (!items || items.length === 0) return null;

	return (
		<SectionWrapper
			className={className}
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			background={background}
		>
			{title && (
				<div className="text-center mb-12">
					<TypographyH3 className="text-2xl md:text-3xl font-bold">
						{title}
					</TypographyH3>
				</div>
			)}

			{/* Alternating Timeline */}
			<div className="relative max-w-4xl mx-auto" ref={containerRef}>
				{/* Central Timeline Line - Dotted Background */}
				<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-primary/30" />

				{/* Animated Progress Line */}
				<motion.div
					className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-primary origin-top"
					style={{ height: lineHeight }}
				/>

				{/* Timeline Items */}
				<div className="md:space-y-14 space-y-10">
					{items.map(
						(
							item: {
								title: string;
								date: string;
								description?: string | null;
								id?: string | null;
							},
							index: number,
						) => {
							const isEven = index % 2 === 0;

							return (
								<div
									key={item.id || index}
									className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-start"
								>
									{/* Left Content (for even items) / Date (for odd items) */}
									<div
										className={cn(
											isEven ? "text-right pr-10" : "text-right md:pr-10 pr-2",
										)}
									>
										{isEven ? (
											<span className="block text-2xl md:text-3xl font-bold text-primary">
												{item.date}
											</span>
										) : (
											<>
												<span className="block text-2xl md:text-3xl font-bold text-primary mb-2">
													{item.title}
												</span>
												{item.description && (
													<p className="text-sm text-muted-foreground leading-relaxed">
														{item.description}
													</p>
												)}
											</>
										)}
									</div>

									{/* Center Node */}
									<div className="relative z-10 flex items-center justify-center md:pt-2.5 pt-1.5">
										<span
											className={cn(
												"h-[2px] w-10 bg-primary inline-flex absolute",
												isEven ? "-left-10" : "-right-10",
											)}
										/>

										<div
											className={cn(
												"w-4 h-4 rounded-full border-2 border-primary bg-background transition-all",
												"w-6 h-6 bg-primary",
											)}
										/>
									</div>

									{/* Right Content (for odd items) / Title & Desc (for even items) */}
									<div
										className={cn(
											isEven ? "text-left md:pl-10 pl-2" : "text-left pl-10",
										)}
									>
										{isEven ? (
											<>
												<span className="block text-2xl md:text-3xl font-bold text-primary mb-2">
													{item.title}
												</span>
												{item.description && (
													<p className="text-sm text-muted-foreground leading-relaxed">
														{item.description}
													</p>
												)}
											</>
										) : (
											<span className="block text-2xl md:text-3xl font-bold text-primary">
												{item.date}
											</span>
										)}
									</div>
								</div>
							);
						},
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}
