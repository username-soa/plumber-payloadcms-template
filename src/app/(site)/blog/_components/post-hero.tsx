import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TypographyH1 } from "@/components/ui/typography";
import type { BlogPost, Author } from "@/payload-types";
import { getMediaUrl, getMediaAlt } from "@/lib/payload-utils";

interface PostHeroProps {
	post: BlogPost;
	readTime: number;
}

export function PostHero({ post, readTime }: PostHeroProps) {
	const imageUrl = getMediaUrl(post.featuredImage);
	const imageAlt = getMediaAlt(post.featuredImage, post.title);
	const author = post.author as Author | null;
	const authorImageUrl = getMediaUrl(author?.avatar);

	return (
		<div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={imageAlt}
					fill
					sizes="100vw"
					className="object-cover brightness-[0.3]"
					priority
					fetchPriority="high"
				/>
			) : (
				<div className="absolute inset-0 bg-primary/90" />
			)}

			<div className="container px-6 mx-auto relative z-10 pb-16 md:pb-24 text-white">
				<div className="max-w-4xl space-y-6">
					<Link
						href="/blog"
						className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-6"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Blog
					</Link>

					<div className="flex flex-wrap gap-3">
						{post.category && (
							<Badge
								variant="outline"
								className="text-white border-white/20 bg-white/10 backdrop-blur-sm capitalize"
							>
								<TagIcon className="w-3 h-3 mr-1" />
								{post.category}
							</Badge>
						)}
						<Badge
							variant="outline"
							className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
						>
							<Clock className="w-3 h-3 mr-1" />
							{readTime} min read
						</Badge>
					</div>

					<TypographyH1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
						{post.title}
					</TypographyH1>

					<div className="flex items-center gap-6 text-white/90">
						{author && (
							<div className="flex items-center gap-3">
								{authorImageUrl && (
									<div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
										<Image
											src={authorImageUrl}
											alt={author.name}
											fill
											className="object-cover"
										/>
									</div>
								)}
								<div className="font-medium">{author.name}</div>
							</div>
						)}
						{post.publishedAt && (
							<div className="flex items-center gap-2 text-sm">
								<Calendar className="w-4 h-4" />
								<time dateTime={post.publishedAt}>
									{new Date(post.publishedAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</time>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
