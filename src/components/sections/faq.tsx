import dynamic from "next/dynamic";
import { MessageCircleQuestion } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";
import {
	CMSLinkItem,
	CMSLinkType,
} from "@/components/heroes/components/cms-link-item";

// Skeleton Loader for the Accordion
const FAQSkeleton = () => (
	<div className="w-full flex flex-col gap-4">
		{[1, 2, 3, 4, 5].map((i) => (
			<div
				key={i}
				className="h-20 w-full rounded-xl bg-card/50 animate-pulse border border-border/10"
			/>
		))}
	</div>
);

// Dynamic import for the Accordion
const FAQAccordion = dynamic(() => import("./faq-accordion"), {
	loading: () => <FAQSkeleton />,
});

import type { Faq } from "@/payload-types";

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
}

export function FAQSection({
	title,
	titleHighlight,
	description,
	faqs,
	cta,
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
		<section className="w-full py-24 bg-muted/20">
			<div className="container mx-auto px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					{/* Left Column: Header & Info Card */}
					<div className="flex flex-col gap-6 lg:sticky top-8">
						<div className="flex items-center gap-2 text-primary font-medium">
							<MessageCircleQuestion className="w-5 h-5" />
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
											{cta.text && (
												<TypographyMuted>{cta.text}</TypographyMuted>
											)}
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
			</div>
		</section>
	);
}
