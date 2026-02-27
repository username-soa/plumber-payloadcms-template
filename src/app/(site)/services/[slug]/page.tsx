import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { draftMode } from "next/headers";

import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import type { Service } from "@/payload-types";
import {
	generateServiceSchema,
	generateServiceBreadcrumbs,
} from "@/lib/json-ld";
import {
	getServiceBySlug,
	getServices,
	getSubServices,
	getRelatedServices,
} from "@/lib/payload/getServices";
import { getCompanyInfo } from "@/lib/payload/getGlobals";
import { ServiceHero } from "@/app/(site)/services/components/service-hero";
import { RenderBlocks } from "@/components/payload/RenderBlocks";
import { RelatedServices } from "../components/related-services";

const { brand, seo } = SITE_CONFIG;

interface ServicePageProps {
	params: Promise<{
		slug: string;
	}>;
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
	// React.cache() ensures the page component below reuses this result.
	const service = await getServiceBySlug(slug);

	if (!service) {
		return { title: "Service Not Found" };
	}

	const metaTitle = service.meta?.title;
	const metaDescription = service.meta?.description;
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
		openGraph: {
			title,
			description,
			url: `/services/${slug}`,
		},
	};
}

// 3. Main Page Component
export default async function ServicePage({ params }: ServicePageProps) {
	const [{ slug }, { isEnabled: isDraftMode }] = await Promise.all([
		params,
		draftMode(),
	]);

	// Shared with generateMetadata via React.cache() — zero extra DB hits.
	const payloadService = await getServiceBySlug(slug, isDraftMode);

	if (!payloadService) {
		notFound();
	}

	// Fetch sub-services, related services, and companyInfo in parallel.
	const [childServices, relatedServices, companyInfo] = await Promise.all([
		getSubServices(payloadService.id),
		getRelatedServices(slug),
		getCompanyInfo(),
	]);

	// Pass the full service objects to RenderBlocks
	const subServices = childServices;

	// Extract parent service if available (for breadcrumbs)
	let parentServiceInfo: { title: string; slug: string } | undefined;
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

	// Pass companyInfo so generateServiceSchema uses CMS phone/city data.
	const serviceSchema = generateServiceSchema(payloadService, companyInfo);

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			generateServiceBreadcrumbs(payloadService.title, parentServiceInfo),
			serviceSchema,
			// FAQs from the layout blocks are handled individually by each block.
			// Add top-level FAQ JSON-LD here if a dedicated faqs field is added to the Service schema later.
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
			<RenderBlocks layout={payloadService.layout} subServices={subServices} />

			<RelatedServices services={relatedServices} />
		</>
	);
}
