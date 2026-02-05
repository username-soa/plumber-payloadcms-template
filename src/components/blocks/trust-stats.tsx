"use client";

import { useEffect, useRef, useState } from "react";
import { TypographyH2 } from "@/components/ui/typography";
// type TrustStatsBlock = any; // Placeholder until types are generated
interface TrustStatsBlock {
	title?: string;
	titleHighlight?: string;
	stats?: {
		value: string;
		label: string;
		id?: string;
	}[];

	bottomText?: string;
	cols?: "3" | "4" | "6";
	backgroundColor?: "transparent" | "muted";
}
import { cn } from "@/lib/utils";


function AnimatedStat({ value, label }: { value: string; label: string }) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={cn(
				"text-center transition-all duration-700",
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
			)}
		>
			<div className="text-4xl md:text-5xl font-bold text-primary mb-2">
				{value}
			</div>
			<div className="text-muted-foreground font-medium">{label}</div>
		</div>
	);
}

export function TrustStats(props: TrustStatsBlock & { className?: string }) {
	const {
		title,
		titleHighlight,
		stats,
		bottomText,
		className,
		cols = "6",
		backgroundColor = "transparent",
	} = props;

	return (
		<section
			className={cn(
				"py-20",
				backgroundColor === "muted" ? "bg-muted/50" : "bg-background",
				className,
			)}
		>
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					{bottomText && (
						<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
							<span className="uppercase tracking-wider text-sm">
								{bottomText}
							</span>
						</div>
					)}
					{titleHighlight && title ? (
						<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight">
							{title.split(titleHighlight)[0]}
							<span className="text-primary">{titleHighlight}</span>
							{title.split(titleHighlight)[1]}
						</TypographyH2>
					) : (
						title && (
							<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight">
								{title}
							</TypographyH2>
						)
					)}
				</div>

				{stats && stats.length > 0 && (
					<div
						className={cn(
							"grid grid-cols-2 md:grid-cols-3 gap-8",
							// Dynamic columns for large screens
							cols === "3" && "lg:grid-cols-3",
							cols === "4" && "lg:grid-cols-4",
							cols === "6" && "lg:grid-cols-6",
						)}
					>
						{stats.map((stat, index) => (
							<div
								key={stat.id || index}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<AnimatedStat value={stat.value} label={stat.label} />
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
