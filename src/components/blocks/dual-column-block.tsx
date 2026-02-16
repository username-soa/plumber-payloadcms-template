import type React from "react";
import { SectionWrapper } from "../ui/section-wrapper";
import type { PaddingOption } from "../ui/section-wrapper";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import { CMSLink } from "../payload/CMSLink";
import type { Page } from "@/payload-types";

type Props = Extract<Page["layout"][0], { blockType: "dualColumn" }>;

export const DualColumnBlock: React.FC<Props> = ({
	columns,
	paddingTopOption = "default",
	paddingBottomOption = "default",
}) => {
	return (
		<SectionWrapper
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
				{columns?.map((col, index) => {
					if (col.type === "image") {
						const image = col.image;
						// Ensure image is a populated Media object
						const imageUrl =
							image && typeof image === "object" && "url" in image
								? image.url
								: null;
						const imageAlt =
							(image &&
								typeof image === "object" &&
								"alt" in image &&
								image.alt) ||
							"Image";

						if (!imageUrl) return null;

						return (
							<div
								key={col.id || index}
								className="relative w-full h-full min-h-[300px] max-md:aspect-2/3 rounded-2xl overflow-hidden shadow-xl"
							>
								<Image
									src={imageUrl}
									alt={imageAlt}
									fill
									className="object-cover w-full h-full"
									priority
								/>
							</div>
						);
					}

					return (
						<div key={col.id || index} className="flex flex-col gap-6">
							{col.richText && (
								<div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-p:text-lg prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
									<RichText data={col.richText} converters={blockConverters} />
								</div>
							)}
							{col.links && col.links.length > 0 && (
								<div className="flex flex-wrap gap-4 mt-2">
									{col.links.map((link, idx) => {
										// Helper to safely access link properties that might be null/undefined
										const linkProps = link.link;
										if (!linkProps) return null;
										return <CMSLink key={link.id || idx} link={linkProps} />;
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</SectionWrapper>
	);
};
