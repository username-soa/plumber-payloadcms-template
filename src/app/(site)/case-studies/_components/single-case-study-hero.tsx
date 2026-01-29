import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { CaseStudy, Media } from "@/payload-types";

interface SingleCaseStudyHeroProps {
	study: CaseStudy;
}

export function SingleCaseStudyHero({ study }: SingleCaseStudyHeroProps) {
	const featuredImage = study.featuredImage as Media | null;
	const imageUrl = featuredImage?.url;

	return (
		<div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
			{imageUrl && (
				<Image
					src={imageUrl}
					alt={study.title}
					fill
					sizes="100vw"
					className="object-cover brightness-[0.3]"
					loading="eager"
					fetchPriority="high"
				/>
			)}
			<div className="container px-6 mx-auto relative z-10 pb-16 md:pb-24 text-white">
				<div className="max-w-4xl space-y-6">
					<Link
						href="/case-studies"
						className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-6"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Case Studies
					</Link>

					<div className="flex flex-wrap gap-3">
						{study.category && (
							<Badge
								variant="outline"
								className="text-white border-white/20 bg-white/10 backdrop-blur-sm capitalize"
							>
								<Tag className="w-3 h-3 mr-1" />
								{study.category}
							</Badge>
						)}
						{study.location && (
							<Badge
								variant="outline"
								className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
							>
								<MapPin className="w-3 h-3 mr-1" />
								{study.location}
							</Badge>
						)}
						{study.duration && (
							<Badge
								variant="outline"
								className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
							>
								<Calendar className="w-3 h-3 mr-1" />
								{study.duration}
							</Badge>
						)}
					</div>

					<TypographyH1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
						{study.title}
					</TypographyH1>
					{study.summary && (
						<TypographyP className="text-xl md:text-2xl text-white/80 max-w-2xl font-light mt-0">
							{study.summary}
						</TypographyP>
					)}
				</div>
			</div>
		</div>
	);
}
