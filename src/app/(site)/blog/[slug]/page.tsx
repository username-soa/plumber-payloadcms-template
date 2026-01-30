import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { generateArticleSchema, generateBlogBreadcrumbs } from "@/lib/json-ld";
import type { BlogPost, Author } from "@/payload-types";
import { getMediaUrl } from "@/lib/payload-utils";
import { PostHero } from "../_components/post-hero";
import { PostContent } from "../_components/post-content";
import { PostSidebar } from "../_components/post-sidebar";

const { seo } = SITE_CONFIG;

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "blog-posts",
		where: {
			slug: { equals: slug },
			status: { equals: "published" },
		},
		limit: 1,
		depth: 2,
	});
	return result.docs[0] || null;
}

async function getAllBlogPostSlugs(): Promise<string[]> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "blog-posts",
		where: {
			status: { equals: "published" },
		},
		limit: 1000,
	});
	return result.docs.map((doc) => doc.slug).filter(Boolean) as string[];
}

async function getRelatedPosts(
	category: string,
	currentSlug: string,
): Promise<BlogPost[]> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "blog-posts",
		where: {
			and: [
				{
					category: {
						equals: category,
					},
				},
				{
					slug: {
						not_equals: currentSlug,
					},
				},
				{
					status: {
						equals: "published",
					},
				},
			],
		},
		limit: 3,
		depth: 1,
		sort: "-publishedAt",
	});
	return result.docs;
}

export async function generateStaticParams() {
	const slugs = await getAllBlogPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
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
			images: ogImage
				? [
						{
							url: ogImage,
						},
					]
				: undefined,
		},
	};
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = post.category
		? await getRelatedPosts(post.category, slug)
		: [];

	const imageUrl = getMediaUrl(post.featuredImage);
	const author = post.author as Author | null;

	// Calculate read time (rough estimate)
	const readTime = post.content
		? Math.ceil(JSON.stringify(post.content).length / 3000)
		: 5;

	// JSON-LD Schema for blog post
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// Breadcrumb schema
			generateBlogBreadcrumbs(post.title),
			// Article schema (NewsArticle or BlogPosting)
			generateArticleSchema({
				title: post.meta?.title || post.title,
				description: post.meta?.description || post.summary || "",
				slug: post.slug || "",
				datePublished: post.publishedAt || post.createdAt,
				dateModified: post.updatedAt,
				image: getMediaUrl(post.meta?.image) || imageUrl || undefined,
				category: post.category || undefined,
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
