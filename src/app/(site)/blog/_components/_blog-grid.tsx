import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, SearchX } from "lucide-react";
import { getPayload } from "payload";
import config from "@payload-config";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost, Author, Tag as TagType } from "@/payload-types";
import { getMediaUrl, getMediaAlt, getCategoryName } from "@/lib/payload-utils";

async function getBlogPosts(): Promise<BlogPost[]> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "blog-posts",
		limit: 100,
		sort: "-publishedAt",
		where: {
			status: { equals: "published" },
		},
	});
	return result.docs;
}

export async function BlogGrid() {
	const posts = await getBlogPosts();

	if (posts.length === 0) {
		return (
			<section className="py-24 bg-muted/30">
				<div className="container mx-auto px-6 max-w-md text-center">
					<div className="bg-background rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
						<SearchX className="w-8 h-8 text-muted-foreground" />
					</div>
					<h2 className="text-xl font-semibold mb-2">No posts found</h2>
					<p className="text-muted-foreground">
						We haven't published any blog posts yet. Please check back later for
						updates and industry news.
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{posts.map((post, index) => {
						const imageUrl = getMediaUrl(post.featuredImage);
						const imageAlt = getMediaAlt(post.featuredImage, post.title);
						const author = post.author as Author | null;

						return (
							<Link
								key={post.id}
								href={`/blog/${post.slug}`}
								className="group block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
							>
								<Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-colors pt-0 shadow-sm hover:shadow-md">
									<div className="relative aspect-video overflow-hidden bg-muted">
										{imageUrl ? (
											<Image
												src={imageUrl}
												alt={imageAlt}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
												className="object-cover transition-transform duration-500 group-hover:scale-105"
												priority={index === 0}
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
												No Image
											</div>
										)}
										{post.category && (
											<div className="absolute top-4 left-4">
												<Badge
													variant="secondary"
													className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background capitalize"
												>
													{getCategoryName(post.category)}
												</Badge>
											</div>
										)}
									</div>

									<CardHeader className="space-y-3 pb-3">
										<div className="flex items-center gap-4 text-xs text-muted-foreground">
											{post.publishedAt && (
												<div className="flex items-center gap-1">
													<Calendar className="w-3.5 h-3.5" />
													<time dateTime={post.publishedAt}>
														{new Date(post.publishedAt).toLocaleDateString(
															"en-US",
															{
																month: "short",
																day: "numeric",
																year: "numeric",
															},
														)}
													</time>
												</div>
											)}
											{author && (
												<div className="flex items-center gap-1">
													<User className="w-3.5 h-3.5" />
													<span>{author.name}</span>
												</div>
											)}
										</div>
										<h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
											{post.title}
										</h2>
									</CardHeader>

									<CardContent className="grow pb-4">
										{post.summary && (
											<p className="text-muted-foreground line-clamp-3 text-sm">
												{post.summary}
											</p>
										)}
										{post.tags && post.tags.length > 0 && (
											<div className="flex flex-wrap gap-2 mt-4">
												{(post.tags as TagType[]).slice(0, 3).map((tag) => (
													<span
														key={tag.id}
														className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground font-medium"
													>
														#{tag.name}
													</span>
												))}
											</div>
										)}
									</CardContent>

									<CardFooter className="pt-0 pb-6">
										<Button
											variant="link"
											className="p-0! h-auto font-semibold text-primary group-hover:text-primary/80"
										>
											Read Article{" "}
											<ArrowRight className="w-4 h-4 transition-transform -rotate-45 group-hover:rotate-0 ml-1" />
										</Button>
									</CardFooter>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
