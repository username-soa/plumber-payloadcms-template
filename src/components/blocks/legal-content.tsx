import type { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import {
	SectionWrapper,
	type PaddingOption,
} from "@/components/ui/section-wrapper";

type LegalContentProps = NonNullable<Page["layout"]>[number] & {
	blockType: "legalContent";
	paddingTopOption?: string | null;
	paddingBottomOption?: string | null;
	background?: {
		bg?: "transparent" | "muted" | "primary" | null;
		decoration?: "none" | "dots" | null;
	};
};

export function LegalContent({
	content,
	paddingTopOption,
	paddingBottomOption,
	background,
}: LegalContentProps) {
	if (!content) return null;

	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
			background={background}
		>
			<div className="max-w-3xl mx-auto">
				<div className="prose prose-slate dark:prose-invert max-w-none">
					<RichText data={content} converters={blockConverters} />
				</div>
			</div>
		</SectionWrapper>
	);
}
