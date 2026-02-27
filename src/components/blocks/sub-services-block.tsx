"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { ServiceCard } from "@/components/cards/service-card";
import { HighlightedTitle } from "@/components/ui/highlighted-title";
import type { Service } from "@/payload-types";

type SubServicesBlockProps = Extract<
	NonNullable<Service["layout"]>[number],
	{ blockType: "subServices" }
> & {
	/** Runtime-only: child services injected by RenderBlocks */
	subServices?: Service[];
};

export const SubServicesBlockComponent = (props: SubServicesBlockProps) => {
	const {
		tag,
		title,
		highlightedText,
		description,
		paddingTopOption = "default",
		paddingBottomOption = "default",
		background,
		subServices = [],
	} = props;

	if (!subServices.length) return null;

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
		>
			<div className="grid gap-4 lg:grid-cols-[1fr_2fr] grid-cols-1">
				{/* Header */}
				<div className="max-w-2xl">
					{tag && (
						<span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-foreground bg-muted rounded-md">
							{tag}
						</span>
					)}
					<TypographyH2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 border-none">
						<HighlightedTitle title={title} highlight={highlightedText} />
					</TypographyH2>
					{description && (
						<TypographyP className="text-muted-foreground text-lg mt-0">
							{description}
						</TypographyP>
					)}
				</div>

				{/* Grid Layout mimicking the custom blocks, set to 2 columns per request */}
				<div className="grid grid-cols-1 md:grid-cols-2 [&>*:last-child:nth-child(odd)]:md:col-span-2 gap-px bg-border">
					{subServices.map((service, index) => (
						<div
							key={service.slug || service.title || index}
							className="h-full"
						>
							<ServiceCard service={service} />
						</div>
					))}
				</div>
			</div>
		</SectionWrapper>
	);
};
