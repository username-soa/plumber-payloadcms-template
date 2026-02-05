import type { Page } from "@/payload-types";

import { LegalContent } from "@/components/blocks/legal-content";
import { LegalContact } from "@/components/blocks/legal-contact";
import { BackLink } from "@/components/blocks/back-link";
import { ReviewSection } from "@/components/sections/review";
import { FAQSection } from "@/components/sections/faq";
import { Certifications } from "@/components/blocks/certifications";
import { Team } from "@/components/blocks/team";
import { TrustStats } from "@/components/blocks/trust-stats";
import { Timeline } from "@/components/blocks/timeline";
import { ContentFetcher } from "@/components/blocks/content-fetcher";

interface RenderBlocksProps {
	layout: Page["layout"];
	pageTitle: string;
	updatedAt: string;
	lastUpdated?: string | null;
	searchParams?: {
		page?: string;
		category?: string;
		tag?: string;
		search?: string;
		[key: string]: string | string[] | undefined;
	};
}

export function RenderBlocks({
	layout,
	pageTitle,
	updatedAt,
	lastUpdated,
	searchParams,
}: RenderBlocksProps) {
	if (!layout) return null;

	return (
		<>
			{layout.map((block, index) => {
				const { blockType } = block;

				if (!blockType) return null;

				const key = (block as { id?: string }).id || index;

				switch (blockType) {
					case "legalContent":
						return <LegalContent key={key} {...block} />;
					case "legalContact":
						return <LegalContact key={key} {...block} />;
					case "backLink":
						return <BackLink key={key} {...block} />;
					case "faq":
						return <FAQSection key={key} {...(block as any)} />;
					case "reviewsSection":
						// @ts-ignore
						return <ReviewSection key={key} {...block} />;
					case "certifications":
						// @ts-ignore
						return <Certifications key={key} {...block} />;
					case "team":
						// @ts-ignore
						return <Team key={key} {...block} />;
					case "trustStats":
						// @ts-ignore
						return <TrustStats key={key} {...block} />;
					case "timeline":
						// @ts-ignore
						return <Timeline key={key} {...block} />;
					case "contentFetcher":
						// @ts-ignore
						return (
							<ContentFetcher
								key={key}
								{...block}
								searchParams={searchParams}
							/>
						);
					default:
						// Fallback for unknown blocks or standard blocks if needed
						return null;
				}
			})}
		</>
	);
}
