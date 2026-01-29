import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/payload-types";
import { getMediaUrl, getMediaAlt } from "@/lib/payload-utils";

interface BlogCardProps {
	post: BlogPost;
	featured?: boolean;
	priority?: boolean;
}

export function BlogCard({
	post,
	featured = false,
	priority = false,
}: BlogCardProps) {
	const coverImageUrl = getMediaUrl(post.featuredImage);
	const coverImageAlt = getMediaAlt(post.featuredImage, post.title);

	// Reading time is not in standard BlogPost type yet, might be calculated or missing.
	// For now we can omit or calculate if content exists.
	// The previous code had `post.readingTime`.
	// We'll calculate a rough reading time if content exists, or hide it.
	// Simplifying for now to avoid errors.

	if (featured) {
		return (
			<Link href={`/blog/${post.slug}`} className="group block">
				<Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl py-0">
					<div className="grid md:grid-cols-2 gap-0">
						<div className="relative aspect-4/3 md:aspect-auto overflow-hidden bg-muted">
							{coverImageUrl ? (
								<Image
									src={coverImageUrl}
									alt={coverImageAlt}
									fill
									priority
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
									No Image
								</div>
							)}
							<div className="absolute top-4 left-4">
								<Badge className="bg-primary text-primary-foreground shadow-lg">
									Featured
								</Badge>
							</div>
						</div>

						<div className="flex flex-col justify-center p-8">
							<Badge
								variant="outline"
								className="w-fit mb-4 text-primary border-primary/30 capitalize"
							>
								{post.category}
							</Badge>
							<h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
								{post.title}
							</h2>
							<p className="text-muted-foreground mb-6 line-clamp-3">
								{post.summary}
							</p>
							<div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
								{post.publishedAt && (
									<span className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										{new Date(post.publishedAt).toLocaleDateString()}
									</span>
								)}
							</div>
							<Button
								variant="link"
								className="-ml-2.5 h-auto font-semibold text-primary w-fit cursor-pointer"
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

	return (
		<Link href={`/blog/${post.slug}`} className="group block h-full">
			<Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg pt-0">
				<div className="relative aspect-16/10 overflow-hidden bg-muted">
					{coverImageUrl ? (
						<Image
							src={coverImageUrl}
							alt={coverImageAlt}
							fill
							priority={priority}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 350px, 400px"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
							No Image
						</div>
					)}
					<div className="absolute top-4 left-4">
						<Badge
							variant="secondary"
							className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background capitalize"
						>
							{post.category}
						</Badge>
					</div>
				</div>

				<CardHeader className="space-y-2">
					<h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
						{post.title}
					</h3>
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						{post.publishedAt && (
							<span className="flex items-center gap-1">
								<Calendar className="w-3.5 h-3.5" />
								{new Date(post.publishedAt).toLocaleDateString()}
							</span>
						)}
					</div>
				</CardHeader>

				<CardContent className="grow">
					<p className="text-muted-foreground line-clamp-3">{post.summary}</p>
				</CardContent>

				<CardFooter className="pt-0">
					<Button
						variant="link"
						className="p-0! h-auto font-semibold text-primary group-hover:text-primary/80 cursor-pointer"
					>
						Read Article{" "}
						<ArrowRight className="w-4 h-4 transition-transform -rotate-45 group-hover:rotate-0" />
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
