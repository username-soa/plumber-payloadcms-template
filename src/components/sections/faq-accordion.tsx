import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
	id?: string | null;
	question: string;
	answer: string;
}

interface FAQAccordionProps {
	items: FAQItem[];
	type?: "default" | "simple" | null;
}

export default function FAQAccordion({
	items,
	type = "default",
}: FAQAccordionProps) {
	if (!items || items.length === 0) return null;

	const isSimple = type === "simple";

	return (
		<Accordion
			type="single"
			collapsible
			className={isSimple ? "w-full" : "w-full flex flex-col gap-4"}
			defaultValue={items[0]?.id || undefined}
		>
			{items.map((faq, index) => (
				<AccordionItem
					key={faq.id || index}
					value={faq.id || `item-${index}`}
					className={
						isSimple
							? "border-b border-border/40 py-2"
							: "border-none rounded-xl px-6 bg-card data-[state=open]:bg-primary data-[state=open]:text-primary-foreground transition-all duration-200 shadow-sm"
					}
				>
					<AccordionTrigger
						className={
							isSimple
								? "text-left hover:no-underline py-4 text-base md:text-lg font-medium text-foreground"
								: "text-left hover:no-underline py-6 text-lg font-semibold [&[data-state=open]>svg]:text-primary-foreground"
						}
					>
						{faq.question}
					</AccordionTrigger>
					<AccordionContent
						className={
							isSimple
								? "text-base pb-4 text-muted-foreground"
								: "text-base pb-6 text-primary-foreground"
						}
					>
						{faq.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
