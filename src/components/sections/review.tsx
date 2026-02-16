import { Star } from "lucide-react";

import Marquee from "@/components/ui/marquee";
import { TypographyH2 } from "@/components/ui/typography";
import { ReviewCard } from "@/components/review-card";
import type { CompanyInfo } from "@/payload-types";
import {
	SectionWrapper,
	type PaddingOption,
} from "@/components/ui/section-wrapper";

interface ReviewSectionProps {
	companyInfo?: CompanyInfo;
}

export async function ReviewSection({
	companyInfo,
	title = "Why People Love Us",
	subtitle = "Testimonials",
	source,
	manualReviews,
	selectedReviews,
	paddingTopOption,
	paddingBottomOption,
	background,
}: ReviewSectionProps & {
	title?: string;
	subtitle?: string;
	source?: "manual" | "collection" | "google-api" | "hardcoded";
	manualReviews?: any[];
	selectedReviews?: any[];
	paddingTopOption?: string | null;
	paddingBottomOption?: string | null;
	background?: {
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
}) {
	// Determine review source
	// Priority: Direct Props (Block) > Company Info (Global)
	const globalReviews = companyInfo?.seo?.reviews;

	// If source is provided in props (Block), use it.
	// Otherwise check global config.
	// We default to 'collection' if nothing is set, assuming the user will populate it.
	const activeSource = source || globalReviews?.source || "collection";

	let reviews: any[] = [];

	// Default stats
	let rating = 5.0;
	let totalReviews = 0;

	if (activeSource === "manual") {
		// 1. Manual Reviews (from Block)
		if (manualReviews && manualReviews.length > 0) {
			reviews = manualReviews.map((r) => ({
				id: r.id || Math.random().toString(),
				authorName: r.author,
				authorImage: "", // Manual reviews typically don't have images unless added to schema
				rating: r.rating,
				title: "5 Star Review",
				role: "Customer",
				relativeTime: r.date ? new Date(r.date).toLocaleDateString() : "Recent",
				text: r.content,
			}));
		}
	} else {
		// 2. Collection Reviews (from Block or Global)
		// This covers 'collection', 'hardcoded', or legacy 'google-api' if it had highlighted reviews mapped
		const reviewsToProcess =
			selectedReviews || globalReviews?.highlightedReviews;

		if (reviewsToProcess && reviewsToProcess.length > 0) {
			reviews = reviewsToProcess
				.map((r: any) => {
					// Handle unpopulated ID strings
					if (typeof r === "string") return null;

					return {
						id: r.id,
						authorName: r.author,
						authorImage: r.avatar?.url || "",
						rating: r.rating,
						title: "5 Star Review",
						text: r.content,
						role: "Customer",
						relativeTime: r.date
							? new Date(r.date).toLocaleDateString()
							: "Recent",
					};
				})
				.filter(Boolean);
		}
	}

	// 3. Calculate Stats
	if (reviews.length > 0) {
		const count = reviews.length;
		const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
		const avg = sum / count;

		rating = Number(avg.toFixed(1));
		totalReviews = count;
	} else {
		// If no reviews found, return null to hide the section
		return null;
	}

	const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
	const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

	return (
		<SectionWrapper
			className="w-full overflow-hidden relative"
			// className="w-full bg-background overflow-hidden relative" // Removed bg-background
			background={background}
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
		>
			<div className="mb-12">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
					<div className="max-w-2xl">
						<div className="flex items-center gap-2 text-primary font-medium mb-4">
							<span className="uppercase tracking-wider text-sm">
								{subtitle}
							</span>
						</div>
						<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight">
							{title}
						</TypographyH2>
					</div>

					<div className="group md:flex hidden items-center gap-3 bg-card/60 dark:bg-card/40 backdrop-blur-md px-4 lg:px-5 py-2.5 rounded-full shadow-lg border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
						<div className="flex items-center justify-center p-2 bg-white rounded-full shadow-xs w-9 h-9 shrink-0 relative overflow-hidden">
							<svg viewBox="0 0 24 24" className="w-5 h-5">
								<title>Google Logo</title>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21-1.19-.63z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
						</div>
						<div className="flex flex-col justify-center gap-0.5">
							<div className="flex items-center gap-1.5">
								<span className="font-bold text-lg leading-none text-foreground">
									{rating}
								</span>
								<div className="flex lg:hidden gap-0.5 text-yellow-400">
									<Star className="w-3.5 h-3.5 fill-current" />
								</div>
								<div className="lg:flex hidden gap-0.5 text-yellow-400">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star key={star} className="w-3.5 h-3.5 fill-current" />
									))}
								</div>
							</div>
							<div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground lg:flex hidden">
								Based on {totalReviews} reviews
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden">
				<Marquee pauseOnHover className="[--duration:40s] [--gap:1.5rem]">
					{firstRow.map((review) => (
						<div key={review.id} className="w-[300px] md:w-[400px]">
							<ReviewCard review={review} />
						</div>
					))}
				</Marquee>

				<Marquee
					reverse
					pauseOnHover
					className="[--duration:40s] [--gap:1.5rem]"
				>
					{secondRow.map((review) => (
						<div key={review.id} className="w-[350px] md:w-[450px]">
							<ReviewCard review={review} />
						</div>
					))}
				</Marquee>

				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white dark:from-background"></div>
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white dark:from-background"></div>
			</div>
		</SectionWrapper>
	);
}
