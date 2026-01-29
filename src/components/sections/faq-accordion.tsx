"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
	{
		id: "services",
		question: "What plumbing services do you offer?",
		answer:
			"We offer a comprehensive range of plumbing services including drain cleaning, leak detection, water heater installation, pipe repair, bathroom remodeling, and 24/7 emergency services for both residential and commercial properties.",
	},
	{
		id: "tools",
		question: "Do I need to provide any tools or supplies?",
		answer:
			"No, our professional plumbers arrive fully equipped with all the necessary tools, state-of-the-art diagnostic equipment, and common parts to handle most plumbing issues on the spot.",
	},
	{
		id: "licensed",
		question: "Are your plumbers licensed and insured?",
		answer:
			"Yes, absolutely. All our plumbers are fully licensed, bonded, and insured. We conduct thorough background checks and regular training to ensure the highest standards of safety and professionalism.",
	},
	{
		id: "booking",
		question: "How do I book a plumbing service?",
		answer:
			"Booking is easy! You can call us directly at our hotline, send us an email, or use the 'Book Service Now' button below to schedule an appointment online at your convenience.",
	},
	{
		id: "emergency",
		question: "Do you offer emergency services?",
		answer:
			"Yes, we provide 24/7 emergency plumbing services. Whether it's a burst pipe in the middle of the night or a weekend clogged drain, our team is ready to respond quickly.",
	},
	{
		id: "estimates",
		question: "Do you provide free estimates?",
		answer:
			"Yes, we offer free, no-obligation estimates for most major projects. For smaller diagnostic calls, we have a transparent flat-fee structure that is waived if you proceed with the repair.",
	},
	{
		id: "warranty",
		question: "Is there a warranty on your repairs?",
		answer:
			"We stand by our work with a 100% satisfaction guarantee. All parts come with manufacturer warranties, and we provide a 1-year labor warranty on all repairs and installations for your peace of mind.",
	},
];

export default function FAQAccordion() {
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full flex flex-col gap-4"
			defaultValue="tools"
		>
			{FAQS.map((faq) => (
				<AccordionItem
					key={faq.id}
					value={faq.id}
					className="border-none rounded-xl px-6 bg-card data-[state=open]:bg-primary data-[state=open]:text-primary-foreground transition-all duration-200 shadow-sm"
				>
					<AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-semibold [&[data-state=open]>svg]:text-primary-foreground">
						{faq.question}
					</AccordionTrigger>
					<AccordionContent className="text-base pb-6 text-primary-foreground">
						{faq.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
