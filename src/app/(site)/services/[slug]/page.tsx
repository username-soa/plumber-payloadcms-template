import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/site-config";
import { Hero } from "@/components/heroes";

import { ServiceDetails } from "../_components/service-details";
import { WhyChooseUs } from "../_components/why-choose-us";
import { ProcessSteps } from "../_components/process-steps";
import { QuoteFormCTA } from "../_components/quote-form";
import { ServiceFAQ } from "../_components/service-faq";
import { RelatedServices } from "../_components/related-services";
import { ReviewSection } from "@/components/sections/review";
import { JsonLd } from "@/components/json-ld";
import type { Service } from "@/payload-types";
import {
	generateServiceSchema,
	generateServiceBreadcrumbs,
	generateServiceFAQSchema,
} from "@/lib/json-ld";
import { getServiceBySlug, getServices } from "@/app/(site)/actions/services";
import { getMediaUrl } from "@/lib/payload-utils";

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
	longDescription?: any;
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
	availability?: string;
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

	// Fetch from Payload
	const payloadService = await getServiceBySlug(slug);
	const allServices = await getServices();

	if (!payloadService) {
		notFound();
	}

	// Fetch static config fallback for missing fields (stats, process)
	const staticService = SITE_CONFIG.services.find((s) => s.slug === slug);

	// Map Payload data + Static fallbacks to component Props
	// Ensure types match what components expect
	let subServices: ExtendedService["subServices"] = [];
	if (payloadService.subServices && Array.isArray(payloadService.subServices)) {
		subServices = payloadService.subServices
			.map((sub) => {
				if (typeof sub === "object" && sub !== null) {
					// It's a populated Service object
					const subService = sub as Service;
					return {
						title: subService.title,
						description: subService.description || "",
						icon: subService.icon || "Wrench",
						slug: subService.slug,
					};
				}
				return null;
			})
			.filter((s) => s !== null);
	}

	const faqs: { question: string; answer: string }[] = [];
	// 	payloadService.faqs?.map((faq) => ({
	// 		question: faq.question,
	// 		answer: faq.answer,
	// 	})) || [];

	// Use the explicit short description for now as longDescription is RichText
	// and components expect string.
	// TODO: Implement Rich Text renderer for longDescription if needed.
	const description = payloadService.description;

	// Hybrid Service Object
	const service: ExtendedService = {
		title: payloadService.title,
		slug: payloadService.slug,
		description: description,
		longDescription: payloadService.longDescription || description, // Pass rich text or fallback to short description
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
		availability: payloadService.availability || undefined,
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

			<Hero hero={payloadService.hero} title={payloadService.title} />

			{/* Service Details with Sub-services (SEO-rich content) */}
			<ServiceDetails
				title={service.title}
				longDescription={service.longDescription || service.description}
				subServices={service.subServices}
				process={service.process} // Static process steps
				image={
					getMediaUrl(payloadService.image) ||
					"/images/service/service-details-plumber.png"
				}
			/>

			{/* Why Choose Us + Stats */}
			<WhyChooseUs stats={service.stats} />

			{/* How It Works - Dynamic or Global Process */}
			<ProcessSteps />

			{/* Quote Form CTA */}
			<QuoteFormCTA serviceName={service.title} />

			{/* Reviews Section */}
			<ReviewSection />

			{/* Service-specific FAQs */}
			<ServiceFAQ faqs={service.faqs || []} />

			{/* Related Services */}
			<RelatedServices
				services={allServices
					.filter((s) => s.slug !== service.slug)
					.slice(0, 3)}
			/>
		</>
	);
}
