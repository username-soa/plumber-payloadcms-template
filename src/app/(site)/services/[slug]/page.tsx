import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as Icons from "lucide-react";

import { SITE_CONFIG } from "@/lib/site-config";
import { ServiceHero } from "../_components/service-hero";
import { ServiceDetails } from "../_components/service-details";
import { WhyChooseUs } from "../_components/why-choose-us";
import { ProcessSteps } from "../_components/process-steps";
import { QuoteFormCTA } from "../_components/quote-form";
import { ServiceFAQ } from "../_components/service-faq";
import { RelatedServices } from "../_components/related-services";
import { ReviewSection } from "@/components/sections/review";
import { JsonLd } from "@/components/json-ld";
import {
	generateServiceSchema,
	generateServiceBreadcrumbs,
	generateServiceFAQSchema,
} from "@/lib/json-ld";

const { brand, seo } = SITE_CONFIG;

interface ServicePageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Extended service type for TypeScript
interface ExtendedService {
	title: string;
	slug: string;
	description: string;
	longDescription?: string;
	icon: string;
	metaTitle?: string;
	metaDescription?: string;
	benefits?: string[];
	faqs?: { question: string; answer: string }[];
	subServices?: { title: string; description: string; icon: string }[];
	stats?: { value: string; label: string }[];
	process?: { title: string; description: string; icon: string }[];
	isEmergency?: boolean;
	availability?: string;
}

// 1. Generate Static Params for all services
export async function generateStaticParams() {
	return SITE_CONFIG.services.map((service) => ({
		slug: service.slug,
	}));
}

// 2. Generate Metadata for SEO with dynamic location
export async function generateMetadata({
	params,
}: ServicePageProps): Promise<Metadata> {
	const { slug } = await params;
	const service = SITE_CONFIG.services.find((s) => s.slug === slug);

	if (!service) {
		return {
			title: "Service Not Found",
		};
	}

	// Inject location into meta title/description
	const locationTitle = `${service.title} in ${seo.location.city}`;

	return {
		title:
			service.metaTitle?.replace(
				brand.name,
				`${brand.name} ${seo.location.city}`,
			) || `${locationTitle} | ${brand.name}`,
		description:
			service.metaDescription ||
			`Professional ${service.title.toLowerCase()} services in ${seo.location.city}, ${seo.location.state}. ${service.description}`,
	};
}

// 3. Main Page Component
export default async function ServicePage({ params }: ServicePageProps) {
	const { slug } = await params;
	const service = SITE_CONFIG.services.find((s) => s.slug === slug) as
		| ExtendedService
		| undefined;

	if (!service) {
		notFound();
	}

	// Dynamic Icon
	const Icon =
		(Icons as unknown as Record<string, typeof Icons.Wrench>)[service.icon] ||
		Icons.Wrench;

	// JSON-LD Schema using centralized generators
	const serviceSchema = generateServiceSchema(
		service as Parameters<typeof generateServiceSchema>[0],
	);

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// Breadcrumb schema
			generateServiceBreadcrumbs(service.title),
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

			<ServiceHero
				title={service.title}
				description={service.longDescription || service.description}
				icon={Icon}
				breadcrumbItems={[
					{ label: "Services", href: "/services" },
					{ label: service.title },
				]}
			/>

			{/* Service Details with Sub-services (SEO-rich content) */}
			<ServiceDetails
				title={service.title}
				longDescription={service.longDescription || service.description}
				subServices={service.subServices}
				process={service.process}
				image="/images/service/service-details-plumber.png"
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
			<RelatedServices currentSlug={service.slug || ""} />
		</>
	);
}
