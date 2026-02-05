import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_CONFIG } from "@/lib/site-config";
import type { Page as PayloadPage } from "@/payload-types";
import { getMediaUrl } from "@/lib/payload-utils";
import { RenderBlocks } from "@/components/payload/RenderBlocks";
import { Hero } from "@/components/heroes";
import { JsonLd } from "@/components/json-ld";
import {
	generateOrganizationSchema,
	generateWebsiteSchema,
} from "@/lib/json-ld";
import { getCompanyInfo } from "@/lib/payload/getGlobals";

async function getPageData() {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "pages",
		where: {
			slug: { equals: "index" },
			status: { equals: "published" },
		},
		limit: 1,
	});
	return result.docs[0] || null;
}

export async function generateMetadata() {
	const page = await getPageData();

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
	const companyInfo = await getCompanyInfo();
	const page = (await getPageData()) as PayloadPage | null;
	const resolvedSearchParams = await searchParams;

	if (!page) {
		notFound();
	}

	// Generate comprehensive homepage JSON-LD schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			generateWebsiteSchema(companyInfo),
			generateOrganizationSchema(companyInfo),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />
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
		</>
	);
}
