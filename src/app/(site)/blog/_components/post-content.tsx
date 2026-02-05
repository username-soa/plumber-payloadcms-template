import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import type { BlogPost } from "@/payload-types";

interface PostContentProps {
	post: BlogPost;
}

export function PostContent({ post }: PostContentProps) {
	return (
		<div className="prose prose-lg dark:prose-invert max-w-none">
			{post.summary && (
				<p className="lead text-xl text-muted-foreground mb-8 not-prose border-l-4 border-primary pl-4 italic">
					{post.summary}
				</p>
			)}
			{post.content && (
				<RichText data={post.content} converters={blockConverters} />
			)}
		</div>
	);
}
