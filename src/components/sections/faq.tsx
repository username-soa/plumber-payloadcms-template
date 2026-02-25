import { MessageCircleQuestion } from "lucide-react";
import {
	CMSLinkItem,
	type CMSLinkType,
} from "@/components/heroes/components/cms-link-item";
import { Card, CardContent } from "@/components/ui/card";
import {
	type PaddingOption,
	SectionWrapper,
} from "@/components/ui/section-wrapper";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";
import type { Faq } from "@/payload-types";
import FAQAccordion from "./faq-accordion";
import { HighlightedTitle } from "@/components/ui/highlighted-title";

interface FAQBlockProps {
	title?: string | null;
	titleHighlight?: string | null;
	description?: string | null;
	faqs?: (Faq | number)[] | null;
	cta?: {
		showCta?: boolean | null;
		headline?: string | null;
		text?: string | null;
		ctaLink?: CMSLinkType;
	} | null;
	paddingTopOption?: string | null;
	paddingBottomOption?: string | null;
	background?: {
		bg?: "transparent" | "muted";
		decoration?: "none" | "dots";
	};
	type?: "default" | "simple" | null;
	tag?: string | null;
}

export function FAQSection({
	title,
	titleHighlight,
	description,
	faqs,
	cta,
	paddingTopOption,
	paddingBottomOption,
	background,
	type = "default",
	tag,
}: FAQBlockProps) {
	// Transform relationship data to the format expected by FAQAccordion
	const transformedFaqs = (faqs || [])
		.map((faq) => {
			if (typeof faq === "object" && faq !== null) {
				return {
					id: faq.id.toString(),
					question: faq.question || "",
					answer: faq.answer || "",
				};
			}
			return null;
		})
		.filter(
			(item): item is { id: string; question: string; answer: string } =>
				item !== null,
		);

	const isSimple = type === "simple";

	return (
		<SectionWrapper
			className="w-full"
			background={background}
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
		>
			<div
				className={
					isSimple
						? "flex flex-col items-center text-center gap-12 max-w-4xl mx-auto"
						: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
				}
			>
				{/* Left Column / Header Section */}
				<div
					className={
						isSimple
							? "flex flex-col items-center gap-6"
							: "flex flex-col gap-6 lg:sticky top-8"
					}
				>
					<div className="flex items-center gap-2 text-primary font-medium">
						{/* <MessageCircleQuestion className="w-5 h-5" /> */}
						<span className="uppercase tracking-wider text-sm">
							{tag || "FAQ"}
						</span>
					</div>

					<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight">
						<HighlightedTitle
							title={title || "Your Questions, Our Answers"}
							highlight={titleHighlight}
						/>
					</TypographyH2>

					{description && (
						<TypographyMuted
							className={isSimple ? "text-lg max-w-2xl" : "text-lg max-w-md"}
						>
							{description}
						</TypographyMuted>
					)}

					{!isSimple && cta?.showCta && (
						<Card className="bg-card/50 border-none shadow-sm max-w-md text-left">
							<CardContent className="p-4 flex flex-col gap-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
										<MessageCircleQuestion className="w-8 h-8" />
									</div>
									<div>
										<TypographyH3 className="text-lg font-bold mb-2">
											{cta.headline || "Still Have Questions?"}
										</TypographyH3>
										{cta.text && <TypographyMuted>{cta.text}</TypographyMuted>}
									</div>
								</div>
								{cta.ctaLink && (
									<CMSLinkItem
										link={cta.ctaLink}
										className="w-full h-12 text-base font-semibold shadow-md"
									/>
								)}
							</CardContent>
						</Card>
					)}
				</div>

				{/* Right Column / Accordion Section */}
				<div className={isSimple ? "w-full text-left" : "w-full"}>
					<FAQAccordion items={transformedFaqs} type={type} />
				</div>
			</div>
		</SectionWrapper>
	);
}
