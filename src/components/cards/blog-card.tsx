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
import { getMediaUrl, getMediaAlt, getCategoryName } from "@/lib/payload-utils";

interface BlogCardProps {
	post: BlogPost;
	priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
	const coverImageUrl = getMediaUrl(post.featuredImage);
	const coverImageAlt = getMediaAlt(post.featuredImage, post.title);

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
					<div className="absolute top-4 left-4 flex gap-2">
						{post.featured && (
							<Badge className="bg-primary text-primary-foreground shadow-lg">
								Featured
							</Badge>
						)}
						<Badge
							variant="secondary"
							className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background capitalize"
						>
							{getCategoryName(post.category)}
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
