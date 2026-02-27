import type { Page, Service } from "@/payload-types";

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
import { SubServicesBlockComponent } from "@/components/blocks/sub-services-block";

interface RenderBlocksProps {
	layout: Page["layout"] | Service["layout"];
	searchParams?: {
		page?: string;
		category?: string;
		tag?: string;
		search?: string;
		[key: string]: string | string[] | undefined;
	};
	subServices?: Service[]; // Passed down when rendering on a Service detailing page
}

type LayoutBlock =
	| NonNullable<Page["layout"]>[number]
	| NonNullable<Service["layout"]>[number];

export function RenderBlocks({
	layout,
	searchParams,
	subServices,
}: RenderBlocksProps) {
	if (!layout) return null;

	return (
		<>
			{layout.map((block, index) => {
				const b = block as LayoutBlock;
				const { blockType } = b;

				if (!blockType) return null;

				const key = (block as { id?: string }).id || index;

				switch (blockType) {
					case "legalContent":
						return (
							<LegalContent
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "legalContent" }
								>)}
							/>
						);
					case "legalContact":
						return (
							<LegalContact
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "legalContact" }
								>)}
							/>
						);
					case "backLink":
						return (
							<BackLink
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "backLink" }>)}
							/>
						);
					case "faq":
						return (
							<FAQSection
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "faq" }>)}
							/>
						);
					case "reviewsSection":
						return (
							<ReviewSection
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "reviewsSection" }
								>)}
							/>
						);
					case "team":
						return (
							<Team
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "team" }>)}
							/>
						);
					case "timeline":
						return (
							<Timeline
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "timeline" }>)}
							/>
						);
					case "contentFetcher":
						return (
							<ContentFetcher
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "contentFetcher" }
								>)}
								searchParams={searchParams}
							/>
						);
					case "titleContent":
						return (
							<TitleContentBlock
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "titleContent" }
								>)}
							/>
						);
					case "numbers":
						return (
							<NumbersBlock
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "numbers" }>)}
							/>
						);
					case "imagesGrid":
						return (
							<ImagesGridBlock
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "imagesGrid" }
								>)}
							/>
						);
					case "cardsGrid":
						return (
							<CardsGridBlock
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "cardsGrid" }>)}
							/>
						);
					case "serviceAreas":
						return (
							<ServiceAreasBlockComponent
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "serviceAreas" }
								>)}
							/>
						);
					case "highlightedServices":
						return (
							<HighlightedServicesBlockComponent
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "highlightedServices" }
								>)}
							/>
						);
					case "dualColumn":
						return (
							<DualColumnBlock
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "dualColumn" }
								>)}
							/>
						);
					case "formBlock":
						return (
							<FormBlock
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "formBlock" }>)}
							/>
						);
					case "marquee":
						return (
							<MarqueeBlockComponent
								key={key}
								{...(block as Extract<LayoutBlock, { blockType: "marquee" }>)}
							/>
						);
					case "subServices":
						return (
							<SubServicesBlockComponent
								key={key}
								{...(block as Extract<
									LayoutBlock,
									{ blockType: "subServices" }
								>)}
								subServices={subServices}
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
