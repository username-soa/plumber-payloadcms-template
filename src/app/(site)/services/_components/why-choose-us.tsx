"use client";

import { Fragment } from "react";
import { Shield, Award, Clock, Users } from "lucide-react";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface Stat {
	value: string;
	label: string;
}

interface WhyChooseUsProps {
	stats?: Stat[];
}

const DEFAULT_REASONS = [
	{
		icon: Shield,
		title: "Licensed & Insured",
		description:
			"Fully certified professionals with comprehensive insurance coverage for your peace of mind.",
	},
	{
		icon: Award,
		title: "Quality Guaranteed",
		description:
			"We stand behind our work with industry-leading warranties on all services and parts.",
	},
	{
		icon: Clock,
		title: "Fast Response",
		description:
			"Same-day service available with rapid response times for emergency situations.",
	},
	{
		icon: Users,
		title: "Trusted by Thousands",
		description:
			"Join thousands of satisfied customers who rely on us for their plumbing needs.",
	},
];

const DEFAULT_STATS: Stat[] = [
	{ value: "10+", label: "Years of Experience" },
	{ value: "99%", label: "Customer Satisfaction" },
	{ value: "10K+", label: "Happy Clients" },
];

export function WhyChooseUs({ stats }: WhyChooseUsProps) {
	const displayStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;

	// Calculate grid columns based on number of stats
	// If 3 stats (default): cols-[1fr_1px_1fr_1px_1fr]
	// If 4 stats: cols-[1fr_1px_1fr_1px_1fr_1px_1fr]
	const gridColsClass =
		displayStats.length === 3
			? "md:grid-cols-[1fr_1px_1fr_1px_1fr]"
			: "md:grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr]";

	return (
		<section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

			<div className="container mx-auto px-6 relative z-10 flex flex-col gap-16">
				{/* Header */}
				<div className="text-center mx-auto">
					<span className="text-primary font-semibold text-sm uppercase tracking-wider">
						Why Choose Us
					</span>
					<TypographyH2 className="md:text-5xl text-4xl font-bold text-center mt-2">
						The Trusted Choice for Professional Plumbing
					</TypographyH2>
					<p className="text-muted-foreground text-lg mt-4 text-center">
						We're committed to providing exceptional service with honesty,
						expertise, and a smile.
					</p>
				</div>
				<div
					className={cn(
						"grid grid-cols-1 gap-3 md:gap-0", // reset gap on desktop since we use cols for spacing
						gridColsClass,
					)}
				>
					{displayStats.map((stat, index) => (
						<Fragment key={stat.label}>
							<div className="flex flex-col gap-3 lg:px-4 md:px-2.5 max-md:py-4 items-center text-center md:text-left">
								<span className="text-5xl font-bold tracking-tighter text-foreground">
									{stat.value}
								</span>
								<TypographyH3 className="font-bold text-lg">
									{stat.label}
								</TypographyH3>
							</div>
							{index < displayStats.length - 1 && (
								<div className="md:w-px w-full md:h-full h-px bg-border my-4 md:my-0" />
							)}
						</Fragment>
					))}
				</div>

				{/* Reasons Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					{DEFAULT_REASONS.map((reason) => {
						const Icon = reason.icon;
						return (
							<div
								key={reason.title}
								className={cn(
									"group p-6 rounded-2xl bg-background border border-border",
									"hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
									"transition-all duration-300",
								)}
							>
								<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
									<Icon className="w-7 h-7" />
								</div>
								<h3 className="font-bold text-lg mb-2">{reason.title}</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{reason.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
