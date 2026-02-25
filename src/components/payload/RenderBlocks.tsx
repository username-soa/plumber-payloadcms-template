import type { Page } from "@/payload-types";

import { LegalContent } from "@/components/blocks/legal-content";
import { LegalContact } from "@/components/blocks/legal-contact";
import { BackLink } from "@/components/blocks/back-link";
import { ReviewSection } from "@/components/sections/review";
import { FAQSection } from "@/components/sections/faq";
import { Team } from "@/components/blocks/team";
import { Timeline } from "@/components/blocks/timeline";
import { ContentFetcher } from "@/components/blocks/content-fetcher";
import { TitleContentBlock } from "@/components/blocks/title-content-block";
import { NumbersBlock } from "@/components/blocks/numbers-block";
import { ImagesGridBlock } from "@/components/blocks/images-grid-block";
import { CardsGridBlock } from "@/components/blocks/cards-grid-block";
import { ServiceAreasBlockComponent } from "@/components/blocks/service-areas-block";
import { HighlightedServicesBlockComponent } from "@/components/blocks/highlighted-services-block";
import { DualColumnBlock } from "@/components/blocks/dual-column-block";
import { FormBlock } from "@/components/blocks/form-block";
import { MarqueeBlockComponent } from "@/components/blocks/marquee-block";

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
					case "team":
						// @ts-ignore
						return <Team key={key} {...block} />;
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
					case "titleContent":
						// @ts-ignore
						return <TitleContentBlock key={key} {...block} />;
					case "numbers":
						// @ts-ignore
						return <NumbersBlock key={key} {...block} />;
					case "imagesGrid":
						// @ts-ignore
						return <ImagesGridBlock key={key} {...block} />;
					case "cardsGrid":
						// @ts-ignore
						return <CardsGridBlock key={key} {...block} />;
					case "serviceAreas":
						// @ts-ignore
						return <ServiceAreasBlockComponent key={key} {...block} />;
					case "highlightedServices":
						// @ts-ignore
						return <HighlightedServicesBlockComponent key={key} {...block} />;
					case "dualColumn":
						// @ts-ignore
						return <DualColumnBlock key={key} {...block} />;
					case "formBlock":
						// @ts-ignore
						return <FormBlock key={key} {...block} />;
					// @ts-ignore
					case "marquee":
						// @ts-ignore
						return <MarqueeBlockComponent key={key} {...block} />;
					default:
						// Fallback for unknown blocks or standard blocks if needed
						return null;
				}
			})}
		</>
	);
}
