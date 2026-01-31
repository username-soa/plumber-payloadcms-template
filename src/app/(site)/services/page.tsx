import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { ProcessSteps } from "./_components/process-steps";
import { ReviewSection } from "@/components/sections/review";
import { FAQSection } from "@/components/sections/faq";
import { ServicesHeroMain } from "./_components/services-hero-main";
import { ServicesGrid } from "./_components/services-grid";
import { QuoteFormCTA } from "./_components/quote-form";
import { JsonLd } from "@/components/json-ld";
import {
	generateServicesListingSchema,
	generateWebPageSchema,
} from "@/lib/json-ld";
import { getPayload } from "payload";
import config from "@payload-config";

const { brand, seo } = SITE_CONFIG;

export const metadata: Metadata = {
	title: `Professional Plumbing Services in ${seo.location.city} | ${brand.name}`,
	description: `Comprehensive plumbing services for residential and commercial properties in ${seo.location.city} and ${seo.location.state}. Leak detection, water heaters, drain cleaning, and 24/7 emergency repair.`,
};

export default async function ServicesPage() {
	const { siteUrl } = seo;

	const payload = await getPayload({ config });
	const services = await payload.find({
		collection: "services",
		limit: 100,
	});

	// JSON-LD Schema using centralized generators
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// WebPage schema
			generateWebPageSchema({
				name: `Plumbing Services in ${seo.location.city}`,
				description: metadata.description as string,
				url: `${siteUrl}/services`,
				type: "CollectionPage",
			}),
			// Services listing schema
			generateServicesListingSchema(services.docs),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<ServicesHeroMain />
			<ServicesGrid services={services.docs} />
			<ProcessSteps />
			<QuoteFormCTA serviceName="General Plumbing" />
			<ReviewSection />
			<FAQSection />
		</>
	);
}
