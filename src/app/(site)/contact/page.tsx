import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/sections/faq";
import { ContactHero } from "./_components/contact-hero";
import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";
import { ContactSEOSection } from "./_components/contact-seo-section";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/json-ld";

const { brand, seo } = SITE_CONFIG;

export const metadata: Metadata = {
	title: `Contact Us | ${brand.name} Plumbing - ${seo.location.city}`,
	description: `Get in touch with ${brand.name} for all your plumbing needs in ${seo.location.city}. 24/7 emergency service available. Call us or fill out our contact form for a free quote.`,
};

export default function ContactPage() {
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
				...generateOrganizationSchema(),
				contactPoint: [
					{
						"@type": "ContactPoint",
						telephone: seo.location.phone,
						contactType: "customer service",
						areaServed: seo.location.countryCode,
						availableLanguage: ["English"],
					},
					{
						"@type": "ContactPoint",
						telephone: seo.location.phone,
						contactType: "emergency",
						areaServed: seo.location.countryCode,
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

	return (
		<>
			<JsonLd data={jsonLd} />

			<ContactHero />
			<ContactInfo />

			{/* Contact Form Section with Local SEO Content */}
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
						{/* Left Side - SEO Content */}
						<ContactSEOSection />

						{/* Right Side - Contact Form */}
						<div>
							<ContactForm />
						</div>
					</div>
				</div>
			</section>

			<FAQSection />
		</>
	);
}
