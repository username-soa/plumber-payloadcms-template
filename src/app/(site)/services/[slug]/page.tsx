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
import { ServiceHero } from "@/app/(site)/services/_components/service-hero";
import Link from "next/link";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { SectionWrapper } from "@/components/ui/section-wrapper";
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

			{/* Service Hero */}
			<ServiceHero
				title={payloadService.title}
				description={payloadService.description}
				icon={payloadService.icon}
				isEmergency={payloadService.isEmergency || false}
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Services", href: "/services" },
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

			{/* Sub-services Grid */}
			{subServices && subServices.length > 0 && (
				<SectionWrapper>
					<div className="space-y-6">
						<div>
							<span className="text-primary font-semibold text-sm uppercase tracking-wider">
								What&apos;s Included
							</span>
							<h3 className="text-2xl font-bold mt-2">Our {payloadService.title} Services</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{subServices.map((subService) => (
								<Link
									key={subService.title}
									href={`/services/${subService.slug}`}
									className="group flex flex-col h-full p-8 rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50"
								>
									<div className="mb-3">
										<div className="md:size-10 size-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 bg-background">
											<DynamicIcon name={subService.icon} className="md:size-5 size-4" />
										</div>
									</div>

									<TypographyH2 className="text-xl font-semibold mb-2 text-foreground border-none">
										{subService.title}
									</TypographyH2>
									<TypographyMuted className="text-base line-clamp-3">
										{subService.description}
									</TypographyMuted>
								</Link>
							))}
						</div>
					</div>
				</SectionWrapper>
			)}

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
