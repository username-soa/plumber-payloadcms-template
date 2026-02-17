import type { Metadata } from "next";
import { BlogHero } from "./_components/_blog-hero";
import { BlogGrid } from "./_components/_blog-grid";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
	title: `Blog | ${SITE_CONFIG.brand.name}`,
	description:
		"Expert plumbing advice, maintenance tips, and industry news from FlowMasters. Learn how to keep your home's plumbing in top shape.",
};

export default function BlogPage() {
	return (
		<>
			<BlogHero />
			<BlogGrid />
		</>
	);
}
