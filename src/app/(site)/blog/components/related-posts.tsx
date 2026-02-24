import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/payload-types";
import { getMediaUrl, getMediaAlt } from "@/lib/payload-utils";

interface RelatedPostsProps {
	posts: BlogPost[];
	maxPosts?: number;
}

export function RelatedPosts({ posts, maxPosts = 3 }: RelatedPostsProps) {
	const displayPosts = posts.slice(0, maxPosts);

	if (displayPosts.length === 0) {
		return null;
	}

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-sm text-foreground">Related Posts</h4>
			<div className="space-y-4">
				{displayPosts.map((post) => {
					const imageUrl = getMediaUrl(post.featuredImage);
					const imageAlt = getMediaAlt(post.featuredImage, post.title);

					return (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className="group flex gap-3 p-2 -mx-2 rounded-lg transition-colors hover:bg-muted/50"
						>
							{imageUrl && (
								<div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
									<Image
										src={imageUrl}
										alt={imageAlt}
										fill
										sizes="64px"
										className="object-cover"
									/>
								</div>
							)}
							<div className="flex-1 min-w-0">
								<h5 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
									{post.title}
								</h5>
								{post.publishedAt && (
									<p className="text-xs text-muted-foreground mt-1">
										{new Date(post.publishedAt).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								)}
							</div>
							<ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
						</Link>
					);
				})}
			</div>
		</div>
	);
}
