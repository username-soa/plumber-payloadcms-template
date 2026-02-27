import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { SITE_CONFIG } from "@/lib/site-config";
import { getMediaUrl } from "@/lib/payload-utils";
import { Hero } from "@/components/heroes";
import { RenderBlocks } from "@/components/payload/RenderBlocks";
import { JsonLd } from "@/components/json-ld";
import { generatePageJsonLd } from "@/lib/json-ld";
import { getPageBySlug, getAllPageSlugs } from "@/lib/payload/getPages";
import { getCompanyInfo } from "@/lib/payload/getGlobals";
import { getServices } from "@/lib/payload/getServices";

export async function generateStaticParams() {
	const slugs = await getAllPageSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	// React.cache() ensures the page component below reuses this result.
	const page = await getPageBySlug(slug);

	if (!page) {
		return { title: "Page Not Found" };
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
	const [{ slug }, resolvedSearchParams, { isEnabled: isDraftMode }] =
		await Promise.all([params, searchParams, draftMode()]);

	// Shared with generateMetadata via React.cache() — zero extra DB hits.
	const page = await getPageBySlug(slug, isDraftMode);

	if (!page) {
		notFound();
	}

	// Determine pageType set by the editor (defaults to "default" if unset).
	const pageType: string = page.pageType ?? "default";

	// Fetch companyInfo (always needed for WebPage schema context).
	// Fetch services only when this page is the services listing.
	const [companyInfo, services] = await Promise.all([
		getCompanyInfo(),
		pageType === "servicesListing" ? getServices() : Promise.resolve([]),
	]);

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": generatePageJsonLd(
			page as Parameters<typeof generatePageJsonLd>[0],
			companyInfo,
			services.length > 0 ? services : undefined,
		),
	};

	return (
		<>
			<JsonLd data={jsonLd} />
			<main className="min-h-screen bg-background">
				{/* Hero section */}
				<Hero page={page} />

				{/* Blocks — server-rendered; ContentFetcher must stay server-side */}
				<RenderBlocks
					layout={page.layout}
					searchParams={resolvedSearchParams}
				/>
			</main>
		</>
	);
}
