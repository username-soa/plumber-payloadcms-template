import type React from "react";
import { SectionWrapper } from "../ui/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { getCMSLinkHref, type CMSLinkType } from "@/lib/cms-link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";
import { CMSLink } from "../payload/CMSLink";
import type { Page } from "@/payload-types";

type Props = Extract<Page["layout"][0], { blockType: "dualColumn" }>;

export const DualColumnBlock: React.FC<Props> = ({
	columns,
	paddingTopOption = "default",
	paddingBottomOption = "default",
	background,
}) => {
	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
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

						const hasAutoLink =
							"enableImageLink" in col && col.enableImageLink && col.imageLink;
						const imgLink = (col as { imageLink?: CMSLinkType }).imageLink;
						const href = hasAutoLink && imgLink ? getCMSLinkHref(imgLink) : "";

						const imageContent = (
							<div
								key={col.id || index}
								className={`max-h-[80vh] sticky md:top-[10vh] w-full h-full min-h-[300px] max-md:aspect-2/3 rounded-2xl overflow-hidden shadow-xl ${hasAutoLink ? "group" : ""}`}
							>
								<Image
									src={imageUrl}
									alt={imageAlt}
									fill
									className={`object-cover w-full h-full ${hasAutoLink ? "transition-transform duration-500 group-hover:scale-105" : ""}`}
									priority
								/>
								{hasAutoLink && imgLink && (
									<div className="absolute bottom-3 right-3 bg-background/30 backdrop-blur-md px-2 py-1 rounded-md shadow-lg z-10 text-foreground/90 group-hover:bg-background/90 group-hover:text-foreground transition-colors border border-border/50 text-xs font-medium">
										{imgLink.label || "View Details"}
									</div>
								)}
							</div>
						);

						if (hasAutoLink && href) {
							return (
								<Link
									key={col.id || index}
									href={href}
									target={col.imageLink?.newTab ? "_blank" : undefined}
									className="block w-full h-full"
								>
									{imageContent}
								</Link>
							);
						}

						return imageContent;
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
