import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_CONFIG } from "@/lib/site-config";
import type { Page as PayloadPage } from "@/payload-types";
import { getMediaUrl } from "@/lib/payload-utils";
import { RenderBlocks } from "@/components/payload/RenderBlocks";

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

export async function generateMetadata() {
	const page = await getPageData("privacy-policy");

	if (!page) {
		return {
			title: "Privacy Policy",
		};
	}

	const metaTitle =
		page.meta?.title || `Privacy Policy | ${SITE_CONFIG.brand.name}`;
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

export default async function PrivacyPolicyPage() {
	const page = (await getPageData("privacy-policy")) as PayloadPage | null;

	if (!page) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-background">
			<RenderBlocks
				layout={page.layout}
				pageTitle={page.title}
				updatedAt={page.updatedAt}
				lastUpdated={page.lastUpdated}
			/>
		</main>
	);
}
