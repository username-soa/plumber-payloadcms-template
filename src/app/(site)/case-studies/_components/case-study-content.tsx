import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import type { CaseStudy } from "@/payload-types";

interface CaseStudyContentProps {
	study: CaseStudy;
}

export function CaseStudyContent({ study }: CaseStudyContentProps) {
	return (
		<div className="prose prose-lg dark:prose-invert max-w-none">
			{study.content && (
				<RichText data={study.content} converters={blockConverters} />
			)}
		</div>
	);
}
