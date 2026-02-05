import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { CaseStudy, Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import { getCategoryName } from "@/lib/payload-utils";

interface SingleCaseStudyHeroProps {
	study: CaseStudy;
}

export function SingleCaseStudyHero({ study }: SingleCaseStudyHeroProps) {
	const featuredImage = study.featuredImage as Media | null;
	const imageUrl = featuredImage?.url;

	return (
		<div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={study.title}
					fill
					sizes="100vw"
					className="object-cover brightness-[0.3]"
					loading="eager"
					fetchPriority="high"
				/>
			) : (
				<>
					{/* Background gradient */}
					<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />

					{/* Floating shapes */}
					<div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
				</>
			)}
			<div
				className={cn(
					"container px-6 mx-auto relative z-10 pb-16 md:pb-24",
					imageUrl ? "text-white" : "text-foreground",
				)}
			>
				<div className="max-w-4xl space-y-6">
					<Link
						href="/case-studies"
						className={cn(
							"inline-flex items-center text-sm font-medium hover:opacity-75 transition-opacity mb-6",
						)}
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Case Studies
					</Link>

					<div className="flex flex-wrap gap-3">
						{study.category && (
							<Badge
								variant="outline"
								className={cn(
									" border-white/20 bg-white/10 backdrop-blur-sm capitalize text-inherit",
								)}
							>
								<Tag className="w-3 h-3 mr-1" />
								{getCategoryName(study.category)}
							</Badge>
						)}
						{study.location && (
							<Badge
								variant="outline"
								className={cn(
									" border-white/20 bg-white/10 backdrop-blur-sm text-inherit",
								)}
							>
								<MapPin className="w-3 h-3 mr-1" />
								{study.location}
							</Badge>
						)}
						{study.duration && (
							<Badge
								variant="outline"
								className={cn(
									" border-white/20 bg-white/10 backdrop-blur-sm text-inherit",
								)}
							>
								<Calendar className="w-3 h-3 mr-1" />
								{study.duration}
							</Badge>
						)}
					</div>

					<TypographyH1 className="text-4xl md:text-6xl font-bold tracking-tight ">
						{study.title}
					</TypographyH1>
					{study.summary && (
						<TypographyP className="text-xl md:text-2xl max-w-2xl font-light mt-0">
							{study.summary}
						</TypographyP>
					)}
				</div>
			</div>
		</div>
	);
}
