import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import {
	generateArticleSchema,
	generateCaseStudyBreadcrumbs,
} from "@/lib/json-ld";
import { getMediaUrl, getCategoryName } from "@/lib/payload-utils";
import { SingleCaseStudyHero } from "@/app/(site)/case-studies/components/single-case-study-hero";
import { CaseStudyContent } from "@/app/(site)/case-studies/components/case-study-content";
import { CaseStudySidebar } from "@/app/(site)/case-studies/components/case-study-sidebar";
import {
	getCaseStudyBySlug,
	getAllCaseStudySlugs,
} from "@/lib/payload/getCaseStudies";
import { getCompanyInfo } from "@/lib/payload/getGlobals";

const { seo } = SITE_CONFIG;

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllCaseStudySlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	// React.cache() ensures CaseStudyPage below reuses this result.
	const study = await getCaseStudyBySlug(slug);

	if (!study) {
		return { title: "Case Study Not Found" };
	}

	const metaTitle =
		study.meta?.title || `${study.title} | Case Studies - ${seo.location.city}`;
	const metaDescription = study.meta?.description || study.summary;
	const ogImage =
		getMediaUrl(study.meta?.image) || getMediaUrl(study.featuredImage);

	return {
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			url: `/case-studies/${study.slug}`,
			images: ogImage ? [{ url: ogImage }] : undefined,
		},
	};
}

export default async function CaseStudyPage({ params }: PageProps) {
	const [{ slug }, { isEnabled: isDraftMode }] = await Promise.all([
		params,
		draftMode(),
	]);

	// Shared with generateMetadata via React.cache() — zero extra DB hits.
	const study = await getCaseStudyBySlug(slug, isDraftMode);

	if (!study) {
		notFound();
	}

	const [imageUrl, companyInfo] = await Promise.all([
		Promise.resolve(getMediaUrl(study.featuredImage)),
		getCompanyInfo(),
	]);

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			generateCaseStudyBreadcrumbs(study.title),
			generateArticleSchema(
				{
					title: study.meta?.title || study.title,
					description: study.meta?.description || study.summary || "",
					slug: study.slug || "",
					datePublished:
						study.completedAt || new Date().toISOString().split("T")[0],
					dateModified: study.updatedAt,
					image: getMediaUrl(study.meta?.image) || imageUrl || undefined,
					category: getCategoryName(study.category) || undefined,
					type: "Article",
					basePath: "case-studies",
				},
				companyInfo,
			),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<article className="min-h-screen pb-20">
				<SingleCaseStudyHero study={study} />

				<div className="container px-6 mx-auto mt-12 md:mt-16">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
						<CaseStudyContent study={study} />
						<CaseStudySidebar study={study} />
					</div>
				</div>
			</article>
		</>
	);
}
