import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/payload-types";
import { getMediaUrl, getMediaAlt, getCategoryName } from "@/lib/payload-utils";

interface FeaturedBlogCardProps {
	post: BlogPost;
	priority?: boolean;
}

export function FeaturedBlogCard({
	post,
	priority = false,
}: FeaturedBlogCardProps) {
	const coverImageUrl = getMediaUrl(post.featuredImage);
	const coverImageAlt = getMediaAlt(post.featuredImage, post.title);

	// Estimate read time (rough calculation: ~200 words per minute)
	const readTime = post.summary
		? Math.max(1, Math.ceil(post.summary.split(" ").length / 50))
		: 3;

	return (
		<Link href={`/blog/${post.slug}`} className="group block">
			<Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg py-0">
				<div className="flex flex-col md:flex-row">
					{/* Image Section - Left Side */}
					<div className="relative flex-1 md:w-2/5 aspect-16/10 md:aspect-5/3 md:min-h-[280px] overflow-hidden bg-muted">
						{coverImageUrl ? (
							<Image
								src={coverImageUrl}
								alt={coverImageAlt}
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
						<div className="mb-3">
							<Badge
								variant="outline"
								className="text-primary border-primary/30 font-medium capitalize"
							>
								{getCategoryName(post.category)}
							</Badge>
						</div>

						{/* Title */}
						<h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors mb-3 line-clamp-2">
							{post.title}
						</h3>

						{/* Summary */}
						{post.summary && (
							<p className="text-muted-foreground mb-4 line-clamp-2">
								{post.summary}
							</p>
						)}

						{/* Meta Info */}
						<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
							{post.publishedAt && (
								<span className="flex items-center gap-1.5">
									<Calendar className="w-4 h-4" />
									{new Date(post.publishedAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</span>
							)}
							<span className="flex items-center gap-1.5">
								<Clock className="w-4 h-4" />
								{readTime} min read
							</span>
						</div>

						{/* Read Article Link */}
						<Button
							variant="link"
							className="p-0! h-auto font-semibold text-primary group-hover:text-primary/80 cursor-pointer w-fit"
						>
							Read Article{" "}
							<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</div>
			</Card>
		</Link>
	);
}
