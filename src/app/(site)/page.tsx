import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

import { getMediaUrl } from "@/lib/payload-utils";
import { RenderBlocks } from "@/components/payload/RenderBlocks";
import { Hero } from "@/components/heroes";
import { JsonLd } from "@/components/json-ld";
import {
	generateOrganizationSchema,
	generateWebsiteSchema,
	generateWebPageSchema,
	generateReviewsWithAggregate,
} from "@/lib/json-ld";
import { getCompanyInfo } from "@/lib/payload/getGlobals";
import { getPageBySlug } from "@/lib/payload/getPages";

export async function generateMetadata() {
	const page = await getPageBySlug("index");

	if (!page) {
		return {
			title: SITE_CONFIG.brand.name,
			description: SITE_CONFIG.brand.description,
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

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// React.cache() in getPageBySlug ensures this is the same DB result
	// that generateMetadata already fetched — no second round-trip.
	const [companyInfo, page, resolvedSearchParams] = await Promise.all([
		getCompanyInfo(),
		getPageBySlug("index"),
		searchParams,
	]);

	if (!page) {
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			generateWebsiteSchema(companyInfo),
			generateOrganizationSchema(companyInfo),
			// WebPage for the homepage itself
			generateWebPageSchema({
				name: page.meta?.title || page.title,
				description:
					page.meta?.description || SITE_CONFIG.brand.description || "",
				url: SITE_CONFIG.seo.siteUrl,
				type: "WebPage",
			}),
			// AggregateRating + individual Reviews from CompanyInfo (CMS) or site-config fallback
			generateReviewsWithAggregate(companyInfo),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />
			<main className="min-h-screen bg-background">
				<Hero page={page} />
				<RenderBlocks
					layout={page.layout}
					searchParams={resolvedSearchParams}
				/>
			</main>
		</>
	);
}
