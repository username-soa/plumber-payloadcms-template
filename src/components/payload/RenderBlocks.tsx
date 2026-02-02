import React from "react";
import type { Page } from "@/payload-types";
import { LegalHero } from "@/components/blocks/legal-hero";
import { LegalContent } from "@/components/blocks/legal-content";
import { LegalContact } from "@/components/blocks/legal-contact";
import { BackLink } from "@/components/blocks/back-link";

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
					case "legalHero":
						return (
							<LegalHero
								key={key}
								{...block}
								pageTitle={pageTitle}
								updatedAt={updatedAt}
								lastUpdated={lastUpdated ?? undefined}
							/>
						);
					case "legalContent":
						return <LegalContent key={key} {...block} />;
					case "legalContact":
						return <LegalContact key={key} {...block} />;
					case "backLink":
						return <BackLink key={key} {...block} />;
					default:
						// Fallback for unknown blocks or standard blocks if needed
						return null;
				}
			})}
		</>
	);
}
