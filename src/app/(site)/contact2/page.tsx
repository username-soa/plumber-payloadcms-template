import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/json-ld";

const { brand, seo } = SITE_CONFIG;

export const metadata: Metadata = {
	title: `Contact Us | ${brand.name} Plumbing - ${seo.location.city}`,
	description: `Get in touch with ${brand.name} for all your plumbing needs in ${seo.location.city}. 24/7 emergency service available. Call us or fill out our contact form for a free quote.`,
};

import { getCompanyInfo } from "@/lib/payload/getGlobals";

export default async function ContactPage() {
	const companyInfo = await getCompanyInfo();
	const { siteUrl } = seo;

	// JSON-LD Schema using centralized generators
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// ContactPage schema
			generateWebPageSchema({
				name: `Contact ${brand.name}`,
				description: metadata.description as string,
				url: `${siteUrl}/contact`,
				type: "ContactPage",
			}),
			// Organization schema with contact points
			{
				...generateOrganizationSchema(companyInfo),
				contactPoint: [
					{
						"@type": "ContactPoint",
						telephone: companyInfo.phone || seo.location.phone,
						contactType: "customer service",
						areaServed:
							companyInfo.seo?.location?.countryCode ||
							seo.location.countryCode,
						availableLanguage: ["English"],
					},
					{
						"@type": "ContactPoint",
						telephone: companyInfo.phone || seo.location.phone,
						contactType: "emergency",
						areaServed:
							companyInfo.seo?.location?.countryCode ||
							seo.location.countryCode,
						availableLanguage: ["English"],
						hoursAvailable: {
							"@type": "OpeningHoursSpecification",
							dayOfWeek: [
								"Monday",
								"Tuesday",
								"Wednesday",
								"Thursday",
								"Friday",
								"Saturday",
								"Sunday",
							],
							opens: "00:00",
							closes: "23:59",
						},
					},
				],
			},
		],
	};

	return <JsonLd data={jsonLd} />;
}
