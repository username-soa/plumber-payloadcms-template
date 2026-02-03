import React from "react";
import type { Page } from "@/payload-types";

import { LegalContent } from "@/components/blocks/legal-content";
import { LegalContact } from "@/components/blocks/legal-contact";
import { BackLink } from "@/components/blocks/back-link";
import { ReviewSection } from "@/components/sections/review";
import { FAQSection } from "@/components/sections/faq";

interface RenderBlocksProps {
	layout: Page["layout"];
	pageTitle: string;
	updatedAt: string;
	lastUpdated?: string | null;
}

export function RenderBlocks({
	layout,
	pageTitle,
	updatedAt,
	lastUpdated,
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
					case "reviewBlock":
						// @ts-ignore
						return <ReviewSection key={key} {...block} />;
					default:
						// Fallback for unknown blocks or standard blocks if needed
						return null;
				}
			})}
		</>
	);
}
