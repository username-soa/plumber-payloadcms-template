"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";

// Dynamically import the mobile carousel to reduce initial bundle size
// The carousel uses embla-carousel which is heavy and only needed on mobile
const AboutMobileCarousel = dynamic(() => import("./about-mobile-carousel"), {
	ssr: false,
	loading: () => (
		<div className="md:hidden">
			<div className="animate-pulse bg-muted rounded-3xl aspect-2/3" />
		</div>
	),
});

const STATS = [
	{
		value: "10+",
		label: "Years of Experience",
		description:
			"Over the years, we've earned the trust of hundreds of homeowners and businesses by delivering consistent, high-quality plumbing solutions.",
	},
	{
		value: "99%",
		label: "Customer Satisfaction",
		description:
			"Our experienced team takes pride in every job, using safe and eco-friendly products to create healthier, efficient systems.",
	},
	{
		value: "10K+",
		label: "Happy Clients",
		description:
			"From on-time service to exceptional attention to detail, our commitment to excellence is reflected in our client satisfaction.",
	},
];

const CARDS = [
	{
		title: "Built on Trust, Powered by Service",
		image: "/images/about/about-trust.png",
	},
	{
		title: "Making Efficient Flow Our Promise",
		image: "/images/about/about-team.png",
	},
	{
		title: "Your Trusted Plumbing Experts",
		image: "/images/about/about-expert.png",
	},
];

function AboutCard({
	title,
	image,
	className,
}: {
	title: string;
	image: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"group relative w-full float-left rounded-3xl overflow-hidden cursor-pointer md:h-[400px] max-md:aspect-2/3",
				className,
			)}
		>
			<Image
				src={image}
				alt={title}
				fill
				sizes="(max-width: 768px) 100vw, 400px"
				className="object-cover transition-transform duration-700 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

			<div className="absolute bottom-0 left-0 md:p-6 p-4 w-full">
				{/* <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
					<ArrowUpRight className="w-6 h-6" />
				</div> */}
				<h3 className="text-white text-xl font-bold leading-snug max-w-[80%] group-hover:translate-x-2 transition-transform">
					{title}
				</h3>
			</div>
		</div>
	);
}

export function AboutSection() {
	// State and effects removed as they are now handled in AboutMobileCarousel

	return (
		<section className="w-full py-24 bg-background">
			<div className="container mx-auto px-6 md:px-12">
				{/* Header Section */}
				<div className="flex flex-col xl:gap-x-8 max-xl:gap-y-4 md:mb-20 mb-12">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-primary font-medium">
							<span className="uppercase tracking-wider text-sm">About Us</span>
						</div>
					</div>
					<TypographyH2 className="text-3xl max-w-[1000px] md:text-5xl font-bold border-none tracking-tight leading-tight ">
						At FlowMasters we believe a reliable plumbing system creates a{" "}
						<span className="text-primary">happier and healthier life.</span>
					</TypographyH2>
					<Button
						size="lg"
						className="rounded-full text-base font-semibold shadow-lg hover:scale-105 transition-transform px-6 h-12  mt-4 md:w-fit md:ml-auto"
						asChild
					>
						<Link href="/about">Learn More About Us</Link>
					</Button>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] lg:gap-4 gap-3 mb-20">
					{STATS.map((stat, index) => (
						<Fragment key={stat.label}>
							<div className="flex flex-col gap-3 lg:px-4 md:px-2.5 max-md:py-4">
								<span className="text-5xl font-bold tracking-tighter text-foreground">
									{stat.value}
								</span>
								<TypographyH3 className="font-bold text-lg">
									{stat.label}
								</TypographyH3>
								<TypographyMuted className="text-base leading-relaxed">
									{stat.description}
								</TypographyMuted>
							</div>
							{index < STATS.length - 1 && (
								<div className="md:w-px w-full md:h-full h-px bg-border" />
							)}
						</Fragment>
					))}
				</div>

				{/* Image Grid - Desktop */}
				<div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:gap-8 gap-4">
					{CARDS.map((card) => (
						<AboutCard key={card.title} {...card} />
					))}
				</div>

				{/* Carousel - Mobile */}
				<AboutMobileCarousel />
			</div>
		</section>
	);
}
