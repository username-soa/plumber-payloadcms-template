'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';
import type { BlogPost, Author } from '@/payload-types';
import { PostHero } from '@/app/(site)/blog/_components/post-hero';
import { PostContent } from '@/app/(site)/blog/_components/post-content';
import { PostSidebar } from '@/app/(site)/blog/_components/post-sidebar';

interface BlogPostLivePreviewProps {
	initialData: BlogPost;
	relatedPosts: BlogPost[];
	city: string;
}

/**
 * Client component for Blog Posts live preview.
 */
export function BlogPostLivePreview({
	initialData,
	relatedPosts,
	city,
}: BlogPostLivePreviewProps) {
	const { data } = useLivePreview<BlogPost>({
		initialData,
		serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
		depth: 3,
	});

	const author = data.author as Author | null;
	const readTime = data.content
		? Math.ceil(JSON.stringify(data.content).length / 3000)
		: 5;

	return (
		<article className="min-h-screen pb-20">
			<PostHero post={data} readTime={readTime} />

			<div className="container px-6 mx-auto mt-12 md:mt-16">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
					<PostContent post={data} />

					<PostSidebar
						post={data}
						author={author}
						readTime={readTime}
						relatedPosts={relatedPosts}
						city={city}
					/>
				</div>
			</div>
		</article>
	);
}
