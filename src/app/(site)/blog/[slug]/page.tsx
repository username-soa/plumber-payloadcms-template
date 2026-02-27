import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { generateArticleSchema, generateBlogBreadcrumbs } from "@/lib/json-ld";
import { getMediaUrl } from "@/lib/payload-utils";
import { PostHero } from "@/app/(site)/blog/components/post-hero";
import { PostContent } from "@/app/(site)/blog/components/post-content";
import { PostSidebar } from "@/app/(site)/blog/components/post-sidebar";
import {
	getBlogPostBySlug,
	getAllBlogPostSlugs,
	getRelatedPosts,
} from "@/lib/payload/getBlogPosts";

const { seo } = SITE_CONFIG;

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllBlogPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	// React.cache() ensures BlogPostPage below reuses this result.
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		return { title: "Post Not Found" };
	}

	const metaTitle =
		post.meta?.title || `${post.title} | Blog - ${SITE_CONFIG.brand.name}`;
	const metaDescription = post.meta?.description || post.summary;
	const ogImage =
		getMediaUrl(post.meta?.image) || getMediaUrl(post.featuredImage);

	return {
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			url: `/blog/${post.slug}`,
			images: ogImage ? [{ url: ogImage }] : undefined,
		},
	};
}

export default async function BlogPostPage({ params }: PageProps) {
	const [{ slug }, { isEnabled: isDraftMode }] = await Promise.all([
		params,
		draftMode(),
	]);

	// Shared with generateMetadata via React.cache() — zero extra DB hits.
	const post = await getBlogPostBySlug(slug, isDraftMode);

	if (!post) {
		notFound();
	}

	const categoryId =
		typeof post.category === "object" ? post.category.id : post.category;

	const relatedPosts = categoryId
		? await getRelatedPosts(categoryId, slug)
		: [];

	const imageUrl = getMediaUrl(post.featuredImage);
	const author =
		post.author && typeof post.author === "object" ? post.author : null;
	const readTime = post.content
		? Math.ceil(JSON.stringify(post.content).length / 3000)
		: 5;

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			generateBlogBreadcrumbs(post.title),
			generateArticleSchema({
				title: post.meta?.title || post.title,
				description: post.meta?.description || post.summary || "",
				slug: post.slug || "",
				datePublished: post.publishedAt || post.createdAt,
				dateModified: post.updatedAt,
				image: getMediaUrl(post.meta?.image) || imageUrl || undefined,
				category:
					typeof post.category === "object" ? post.category.name : undefined,
				author: author?.name || SITE_CONFIG.brand.name,
				type: "BlogPosting",
				basePath: "blog",
			}),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<article className="min-h-screen pb-20">
				<PostHero post={post} readTime={readTime} />

				<div className="container px-6 mx-auto mt-12 md:mt-16">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
						<PostContent post={post} />

						<PostSidebar
							post={post}
							author={author}
							readTime={readTime}
							relatedPosts={relatedPosts}
							city={seo.location.city}
						/>
					</div>
				</div>
			</article>
		</>
	);
}
