import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "./share-buttons";
import { TableOfContents } from "./table-of-contents";
import { RelatedPosts } from "./related-posts";
import type { BlogPost, Author, Tag as TagType } from "@/payload-types";

interface PostSidebarProps {
	post: BlogPost;
	author: Author | null;
	readTime: number;
	relatedPosts: BlogPost[];
	city: string;
}

export function PostSidebar({
	post,
	author,
	readTime,
	relatedPosts,
	city,
}: PostSidebarProps) {
	return (
		<aside className="space-y-8">
			<div className="sticky top-24 space-y-8">
				<div className="bg-muted/30 rounded-xl p-6 border border-border">
					<h3 className="font-semibold text-lg mb-4">Article Info</h3>
					<div className="space-y-4 text-sm">
						{author && (
							<div>
								<div className="text-muted-foreground mb-1">Written By</div>
								<div className="font-medium text-foreground text-base">
									{author.name}
								</div>
								{author.bio && (
									<div className="text-muted-foreground mt-1 text-sm">
										{author.bio}
									</div>
								)}
							</div>
						)}

						<div className="h-px bg-border" />

						<div>
							<div className="text-muted-foreground mb-1">Reading Time</div>
							<div className="font-medium text-foreground text-base flex items-center gap-2">
								<Clock className="w-4 h-4" />
								{readTime} min read
							</div>
						</div>

						<div className="h-px bg-border" />

						<div>
							<ShareButtons title={post.title} />
						</div>

						{post.tags && post.tags.length > 0 && (
							<>
								<div className="h-px bg-border" />
								<div>
									<div className="text-muted-foreground mb-2">Tags</div>
									<div className="flex flex-wrap gap-2">
										{(post.tags as TagType[]).map((tag) => (
											<Badge
												key={tag.id}
												variant="secondary"
												className="text-xs"
											>
												{tag.name}
											</Badge>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				<div className="bg-muted/30 rounded-xl p-6 border border-border hidden lg:block">
					<TableOfContents />
				</div>

				{relatedPosts.length > 0 && (
					<div className="bg-muted/30 rounded-xl p-6 border border-border">
						<RelatedPosts posts={relatedPosts} />
					</div>
				)}

				<div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
					<h3 className="font-bold text-xl mb-2">Need a Plumber?</h3>
					<p className="text-primary-foreground mb-6">
						We offer 24/7 emergency services in {city}.
					</p>
					<Button asChild variant="secondary" className="w-full font-semibold">
						<Link href="/contact">Get a Free Quote</Link>
					</Button>
				</div>
			</div>
		</aside>
	);
}
