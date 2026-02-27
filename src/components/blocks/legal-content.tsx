import type { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import { SectionWrapper } from "@/components/ui/section-wrapper";

type LegalContentProps = Extract<
	Page["layout"][0],
	{ blockType: "legalContent" }
>;

export function LegalContent({
	content,
	paddingTopOption,
	paddingBottomOption,
	background,
}: LegalContentProps) {
	if (!content) return null;

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
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
