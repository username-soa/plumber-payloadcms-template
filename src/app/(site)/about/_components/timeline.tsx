"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TypographyH3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site-config";

export function Timeline() {
	const { companyStory } = SITE_CONFIG.aboutUs;
	const { milestones, timeline } = companyStory;
	const containerRef = useRef<HTMLDivElement>(null);

	// Track scroll progress of the timeline container relative to viewport
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"],
	});

	// Transform scroll progress to line height percentage
	const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-12">
				<TypographyH3 className="text-2xl md:text-3xl font-bold">
					{timeline.title}
				</TypographyH3>
			</div>

			{/* Alternating Timeline */}
			<div className="relative" ref={containerRef}>
				{/* Central Timeline Line - Dotted Background */}
				<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-primary/30" />

				{/* Animated Progress Line */}
				<motion.div
					className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-primary origin-top"
					style={{ height: lineHeight }}
				/>

				{/* Timeline Items */}
				<div className="md:space-y-14 space-y-10">
					{milestones.map((milestone, index) => {
						const isEven = index % 2 === 0;
						const chapterNumber = index + 1;

						return (
							<div
								key={milestone.year}
								className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-start"
							>
								{/* Left Content (for even items) / Year (for odd items) */}
								<div
									className={cn(
										isEven ? "text-right pr-10" : "text-right md:pr-10 pr-2",
									)}
								>
									{isEven ? (
										<span className="block text-2xl md:text-3xl font-bold text-primary">
											{milestone.year}
										</span>
									) : (
										<>
											<span className="block text-2xl md:text-3xl font-bold text-primary mb-2">
												Chapter {chapterNumber}
											</span>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{milestone.event}
											</p>
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

								{/* Right Content (for odd items) / Chapter (for even items) */}
								<div
									className={cn(
										isEven ? "text-left md:pl-10 pl-2" : "text-left pl-10",
									)}
								>
									{isEven ? (
										<>
											<span className="block text-2xl md:text-3xl font-bold text-primary mb-2">
												Chapter {chapterNumber}
											</span>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{milestone.event}
											</p>
										</>
									) : (
										<span className="block text-2xl md:text-3xl font-bold text-primary">
											{milestone.year}
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
