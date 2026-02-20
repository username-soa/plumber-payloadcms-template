import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { draftMode } from "next/headers";

import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import type { Service } from "@/payload-types";
import {
	generateServiceSchema,
	generateServiceBreadcrumbs,
	generateServiceFAQSchema,
} from "@/lib/json-ld";
import {
	getServiceBySlug,
	getServices,
	getSubServices,
	getRelatedServices,
} from "@/app/(site)/actions/services";
import { ServiceLivePreview } from "@/components/payload/live-preview/ServiceLivePreview";
import { RenderBlocks } from "@/components/payload/RenderBlocks";
import { WhyChooseUs } from "../_components/why-choose-us";
import { ProcessSteps } from "../_components/process-steps";
import { QuoteFormCTA } from "../_components/quote-form";
import { ServiceFAQ } from "../_components/service-faq";
import { RelatedServices } from "../_components/related-services";
import { ReviewSection } from "@/components/sections/review";

const { brand, seo } = SITE_CONFIG;

interface ServicePageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Extended service type for TypeScript to handle hybrid data
interface ExtendedService {
	title: string;
	slug: string;
	description: string;
	icon: string;
	metaTitle?: string;
	metaDescription?: string;
	benefits?: string[];
	faqs?: { question: string; answer: string }[];
	subServices?: {
		title: string;
		description: string;
		icon: string;
		slug: string;
	}[];
	stats?: { value: string; label: string }[];
	process?: { title: string; description: string; icon: string }[];
	isEmergency?: boolean;
}

// 1. Generate Static Params from Payload
export async function generateStaticParams() {
	const services = await getServices();
	return services.map((service) => ({
		slug: service.slug,
	}));
}

// 2. Generate Metadata for SEO with dynamic location
export async function generateMetadata({
	params,
}: ServicePageProps): Promise<Metadata> {
	const { slug } = await params;
	const service = await getServiceBySlug(slug);

	if (!service) {
		return {
			title: "Service Not Found",
		};
	}

	// Use Payload meta if available, otherwise fall back to generated defaults
	const metaTitle = service.meta?.title;
	const metaDescription = service.meta?.description;

	// Inject location into meta title/description if not explicit in Payload
	// (Or append to it if desiring consistency, but usually CMS overrides)
	const locationTitle = `${service.title} in ${seo.location.city}`;

	const title =
		metaTitle ||
		(service.title
			? `${locationTitle} | ${brand.name}`
			: `Service | ${brand.name}`);

	const description =
		metaDescription ||
		`Professional ${service.title.toLowerCase()} services in ${seo.location.city}, ${seo.location.state}. ${service.description}`;

	return {
		title,
		description,
	};
}

// 3. Main Page Component
export default async function ServicePage({ params }: ServicePageProps) {
	const { slug } = await params;
	const { isEnabled: isDraftMode } = await draftMode();

	// Fetch service first so we can 404 early, then fetch children in parallel
	const payloadService = await getServiceBySlug(slug, isDraftMode);

	if (!payloadService) {
		notFound();
	}

	const childServices = await getSubServices(payloadService.id);
	const relatedServices = await getRelatedServices(slug);

	// Fetch static config fallback for missing fields (stats, process)
	const staticService = SITE_CONFIG.services.find((s) => s.slug === slug);

	// Map child services fetched via parentService relationship
	const subServices: ExtendedService["subServices"] = childServices.map(
		(sub) => ({
			title: sub.title,
			description: sub.description || "",
			icon: sub.icon || "Wrench",
			slug: sub.slug ?? "",
		}),
	);

	const faqs: { question: string; answer: string }[] = [];
	// 	payloadService.faqs?.map((faq) => ({
	// 		question: faq.question,
	// 		answer: faq.answer,
	// 	})) || [];

	const description = payloadService.description;

	// Hybrid Service Object
	const service: ExtendedService = {
		title: payloadService.title,
		slug: payloadService.slug,
		description: description,
		icon: payloadService.icon,
		// Static fallbacks
		stats: staticService?.stats,
		benefits: staticService?.benefits,
		// Dynamic arrays
		subServices: subServices,
		faqs: faqs,
		// Prefer Payload process data, fallback to static if empty
		process: staticService?.process,
		// 	payloadService.process && payloadService.process.length > 0
		// 		? payloadService.process.map((step) => ({
		// 				title: step.title,
		// 				description: step.description || "",
		// 				icon: "CheckCircle",
		// 			}))
		// 		: staticService?.process,
		isEmergency: payloadService.isEmergency || false,
	};

	// Extract parent service if available (for breadcrumbs)
	let parentServiceInfo = undefined;
	if (
		payloadService.parentService &&
		typeof payloadService.parentService === "object"
	) {
		const parent = payloadService.parentService as Service;
		parentServiceInfo = {
			title: parent.title,
			slug: parent.slug,
		};
	}

	// JSON-LD Schema using centralized generators
	// Pass the payload service directly, types are now handled in the utility
	const serviceSchema = generateServiceSchema(payloadService);

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// Breadcrumb schema
			generateServiceBreadcrumbs(service.title, parentServiceInfo),
			// Service schema
			serviceSchema,
			// FAQ schema (if service has FAQs)
			...(service.faqs && service.faqs.length > 0
				? [generateServiceFAQSchema(service.faqs)]
				: []),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			{/* Data-driven sections — react to live preview changes */}
			<ServiceLivePreview
				initialData={payloadService}
				subServices={subServices || []}
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Services", href: "/services" },
					// Optional: Add parent service if exists
					...(parentServiceInfo
						? [
								{
									label: parentServiceInfo.title,
									href: `/services/${parentServiceInfo.slug}`,
								},
							]
						: []),
					{ label: payloadService.title },
				]}
			/>

			<RenderBlocks
				layout={payloadService.layout as any}
				pageTitle={payloadService.title}
				updatedAt={payloadService.updatedAt}
				// Services might not have lastUpdated, preserve fail-safe
				lastUpdated={payloadService.updatedAt}
			/>

			{/* Static sections — rendered server-side, no live preview needed */}
			{/* <WhyChooseUs stats={staticService?.stats} />
			<ProcessSteps />
			<QuoteFormCTA serviceName={payloadService.title} />
			<ReviewSection />
			<ServiceFAQ faqs={faqs} />
			*/}
			<RelatedServices services={relatedServices} />
		</>
	);
}
