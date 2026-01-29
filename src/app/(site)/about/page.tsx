import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/sections/faq";
import { ReviewSection } from "@/components/sections/review";
import { AboutHero } from "./_components/about-hero";
import { CompanyStory } from "./_components/company-story";
import { ServiceAreas } from "./_components/service-areas";
import { TrustStats } from "./_components/trust-stats";
import { MeetTheTeam } from "./_components/meet-the-team";
import { Certifications } from "./_components/certifications";
import { OurValues } from "./_components/our-values";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/json-ld";

const { brand, seo } = SITE_CONFIG;

export const metadata: Metadata = {
	title: `About Us | ${brand.name} - Your Trusted ${seo.location.city} Plumbers`,
	description: `Learn about ${brand.name}, ${seo.location.city}'s trusted family-owned plumbing company since ${seo.foundingDate.split("-")[0]}. Licensed, insured, and committed to serving our community with integrity. Meet our team of expert plumbers.`,
	keywords: [
		`${seo.location.city} plumber`,
		"local plumbing company",
		"family-owned plumber",
		`licensed plumber ${seo.location.city}`,
		"plumbing services near me",
	],
};

export default function AboutPage() {
	const { aboutUs } = SITE_CONFIG;
	const { siteUrl, schemaIds } = seo;

	// JSON-LD Schema using centralized generators
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// WebPage schema for About page
			generateWebPageSchema({
				name: `About ${brand.name}`,
				description: metadata.description as string,
				url: `${siteUrl}/about`,
				type: "AboutPage",
			}),
			// Organization schema
			generateOrganizationSchema(),
			// Team members as Person schema
			...aboutUs.team.map((member) => ({
				"@type": "Person",
				name: member.name,
				jobTitle: member.role,
				description: member.bio,
				image: member.image.startsWith("http")
					? member.image
					: `${siteUrl}${member.image}`,
				worksFor: {
					"@id": `${siteUrl}/${schemaIds.organization}`,
				},
				hasCredential: member.certifications.map((cert) => ({
					"@type": "EducationalOccupationalCredential",
					name: cert,
				})),
			})),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<AboutHero />
			<CompanyStory />
			<OurValues />
			<ServiceAreas />
			<TrustStats />
			<MeetTheTeam />
			<Certifications />
			<ReviewSection />
			<FAQSection />
		</>
	);
}
