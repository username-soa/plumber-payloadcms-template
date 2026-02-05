import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_CONFIG } from "@/lib/site-config";
import type { Page as PayloadPage } from "@/payload-types";
import { getMediaUrl } from "@/lib/payload-utils";
import { RenderBlocks } from "@/components/payload/RenderBlocks";
import { Hero } from "@/components/heroes";

async function getPageData(slug: string) {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "pages",
		where: {
			slug: { equals: slug },
			status: { equals: "published" },
		},
		limit: 1,
	});
	return result.docs[0] || null;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const page = await getPageData(slug);

	if (!page) {
		return {
			title: "Page Not Found",
		};
	}

	const metaTitle =
		page.meta?.title || `${page.title} | ${SITE_CONFIG.brand.name}`;
	const metaDescription = page.meta?.description;

	return {
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			images: page.meta?.image
				? [{ url: getMediaUrl(page.meta.image) }]
				: undefined,
		},
	};
}

export default async function DynamicPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const page = (await getPageData(slug)) as PayloadPage | null;

	if (!page) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-background">
			<Hero page={page} />
			<RenderBlocks
				layout={page.layout}
				pageTitle={page.title}
				updatedAt={page.updatedAt}
				lastUpdated={page.lastUpdated}
				searchParams={resolvedSearchParams}
			/>
		</main>
	);
}
