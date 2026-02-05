import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CaseStudy, Media, Tag } from "@/payload-types";
import { getCategoryName, getTagName } from "@/lib/payload-utils";

interface FeaturedCaseStudyCardProps {
	study: CaseStudy;
	priority?: boolean;
}

export function FeaturedCaseStudyCard({
	study,
	priority = false,
}: FeaturedCaseStudyCardProps) {
	const featuredImage = study.featuredImage as Media | null;
	const imageUrl = featuredImage?.url;

	return (
		<Link
			href={`/case-studies/${study.slug}`}
			className="group block"
			prefetch={false}
		>
			<Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg py-0">
				<div className="flex flex-col md:flex-row">
					{/* Image Section - Left Side */}
					<div className="relative flex-1 md:w-2/5 aspect-4/3 md:aspect-5/3 md:min-h-[280px] overflow-hidden bg-muted">
						{imageUrl ? (
							<Image
								src={imageUrl}
								alt={study.title}
								fill
								priority={priority}
								sizes="(max-width: 768px) 100vw, 40vw"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
								No Image
							</div>
						)}
						{/* Featured Badge */}
						<div className="absolute top-4 left-4">
							<Badge className="bg-primary text-primary-foreground shadow-lg">
								Featured
							</Badge>
						</div>
					</div>

					{/* Content Section - Right Side */}
					<div className="md:w-3/5 flex-1 p-6 md:p-8 flex flex-col justify-center">
						{/* Category Badge */}
						{study.category && (
							<div className="mb-3">
								<Badge
									variant="outline"
									className="text-primary border-primary/30 font-medium capitalize"
								>
									{getCategoryName(study.category)}
								</Badge>
							</div>
						)}

						{/* Tags */}
						{study.tags && study.tags.length > 0 && (
							<div className="mb-3 flex flex-wrap gap-2">
								{study.tags.map((tag) => (
									<Badge
										key={typeof tag === "number" ? tag : tag.id}
										variant="outline"
										className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors capitalize gap-1"
									>
										<TagIcon className="w-3 h-3" />
										{getTagName(tag as Tag)}
									</Badge>
								))}
							</div>
						)}

						{/* Title */}
						<h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors mb-3 line-clamp-2">
							{study.title}
						</h3>

						{/* Summary */}
						{study.summary && (
							<p className="text-muted-foreground mb-4 line-clamp-2">
								{study.summary}
							</p>
						)}

						{/* Meta Info */}
						<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
							{study.location && (
								<span className="flex items-center gap-1.5">
									<MapPin className="w-4 h-4" />
									{study.location}
								</span>
							)}
							{study.completedAt && (
								<span className="flex items-center gap-1.5">
									<Calendar className="w-4 h-4" />
									{new Date(study.completedAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</span>
							)}
						</div>

						{/* Read Case Study Link */}
						<Button
							variant="link"
							className="p-0! h-auto font-semibold text-primary group-hover:text-primary/80 cursor-pointer w-fit"
						>
							Read Case Study{" "}
							<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</div>
			</Card>
		</Link>
	);
}
