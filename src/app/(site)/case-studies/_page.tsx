import type { Metadata } from "next";
import { CaseStudiesHero } from "./_components/_case-studies-hero";
import { CaseStudyGrid } from "./_components/_case-study-grid";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
	title: `Case Studies | ${SITE_CONFIG.brand.name}`,
	description:
		"Explore our portfolio of successful plumbing projects in Water City. From emergency repairs to commercial renovations, see how FlowMasters delivers excellence.",
};

export default function CaseStudiesPage() {
	return (
		<>
			<CaseStudiesHero />
			<CaseStudyGrid />
		</>
	);
}
