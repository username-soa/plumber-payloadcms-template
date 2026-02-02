import type { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";

type LegalContentProps = NonNullable<Page["layout"]>[number] & {
	blockType: "legalContent";
};

export function LegalContent({ content }: LegalContentProps) {
	if (!content) return null;

	return (
		<section className="container mx-auto px-4 py-12 md:py-16">
			<div className="max-w-3xl mx-auto">
				<div className="prose prose-slate dark:prose-invert max-w-none">
					<RichText data={content} converters={blockConverters} />
				</div>
			</div>
		</section>
	);
}
