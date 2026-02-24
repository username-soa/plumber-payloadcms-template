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
		bg?: "transparent" | "muted" | "primary";
		decoration?: "none" | "dots";
	};
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
}: FAQBlockProps) {
	// Transform relationship data to the format expected by FAQAccordion
	const transformedFaqs =
		faqs
			?.map((faq) => {
				if (typeof faq === "object" && faq !== null) {
					return {
						id: faq.id.toString(),
						question: faq.question,
						answer: faq.answer,
					};
				}
				return null;
			})
			.filter((item) => item !== null) || [];

	// Logic to highlight title
	const renderTitle = () => {
		if (!title) return "Your Questions, Our Answers";
		if (!titleHighlight) return title;

		const parts = title.split(new RegExp(`(${titleHighlight})`, "gi"));
		return (
			<>
				{parts.map((part, i) =>
					part.toLowerCase() === titleHighlight.toLowerCase() ? (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<span key={i} className="text-primary">
							{part}
						</span>
					) : (
						part
					),
				)}
			</>
		);
	};

	return (
		<SectionWrapper
			className="w-full"
			background={background}
			paddingTop={paddingTopOption as PaddingOption}
			paddingBottom={paddingBottomOption as PaddingOption}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
				{/* Left Column: Header & Info Card */}
				<div className="flex flex-col gap-6 lg:sticky top-8">
					<div className="flex items-center gap-2 text-primary font-medium">
						{/* <MessageCircleQuestion className="w-5 h-5" /> */}
						<span className="uppercase tracking-wider text-sm">FAQ</span>
					</div>

					<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight">
						{renderTitle()}
					</TypographyH2>

					{description && (
						<TypographyMuted className="text-lg max-w-md">
							{description}
						</TypographyMuted>
					)}

					{cta?.showCta && (
						<Card className="bg-card/50 border-none shadow-sm max-w-md">
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

				{/* Right Column: Accordion */}
				<div className="w-full">
					<FAQAccordion items={transformedFaqs as any} />
				</div>
			</div>
		</SectionWrapper>
	);
}
