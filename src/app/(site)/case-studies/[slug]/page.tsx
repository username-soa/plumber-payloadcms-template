import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import {
	generateArticleSchema,
	generateCaseStudyBreadcrumbs,
} from "@/lib/json-ld";
import type { CaseStudy, Media } from "@/payload-types";
import { SingleCaseStudyHero } from "../_components/single-case-study-hero";
import { CaseStudyContent } from "../_components/case-study-content";
import { CaseStudySidebar } from "../_components/case-study-sidebar";

const { seo } = SITE_CONFIG;

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "case-studies",
		where: {
			slug: { equals: slug },
			_status: { equals: "published" },
		},
		limit: 1,
		depth: 2,
	});
	return result.docs[0] || null;
}

async function getAllCaseStudySlugs(): Promise<string[]> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "case-studies",
		where: {
			_status: { equals: "published" },
		},
		limit: 1000,
	});
	return result.docs.map((doc) => doc.slug).filter(Boolean) as string[];
}

export async function generateStaticParams() {
	const slugs = await getAllCaseStudySlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const study = await getCaseStudyBySlug(slug);

	if (!study) {
		return {
			title: "Case Study Not Found",
		};
	}

	return {
		title: `${study.title} | Case Studies - ${seo.location.city}`,
		description: study.summary,
	};
}

export default async function CaseStudyPage({ params }: PageProps) {
	const { slug } = await params;
	const study = await getCaseStudyBySlug(slug);

	if (!study) {
		notFound();
	}

	const featuredImage = study.featuredImage as Media | null;
	const imageUrl = featuredImage?.url;

	// JSON-LD Schema for case study
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// Breadcrumb schema
			generateCaseStudyBreadcrumbs(study.title),
			// Article schema for case study
			generateArticleSchema({
				title: study.title,
				description: study.summary || "",
				slug: study.slug || "",
				datePublished:
					study.completedAt || new Date().toISOString().split("T")[0],
				image: imageUrl || undefined,
				category: study.category || undefined,
				type: "Article",
				basePath: "case-studies",
			}),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<article className="min-h-screen pb-20">
				<SingleCaseStudyHero study={study} />

				{/* Content Section */}
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
