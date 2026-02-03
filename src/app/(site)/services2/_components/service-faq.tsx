import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { JsonLd } from "@/components/json-ld";

interface FAQItem {
	question: string;
	answer: string;
}

interface ServiceFAQProps {
	faqs: FAQItem[];
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
	if (!faqs || faqs.length === 0) return null;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};

	return (
		<section className="py-16 md:py-24 bg-muted/20">
			<JsonLd data={jsonLd} />
			<div className="container mx-auto px-6 max-w-3xl">
				<div className="text-center mb-12">
					<TypographyH2 className="md:text-5xl text-4xl text-center font-bold mb-4">
						Common Questions
					</TypographyH2>
					<TypographyMuted className="text-base text-center">
						Answers to frequently asked questions about this service.
					</TypographyMuted>
				</div>

				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq) => (
						<AccordionItem key={faq.question} value={faq.question}>
							<AccordionTrigger className="text-left font-semibold text-lg">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground text-base">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
