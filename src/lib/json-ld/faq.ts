/**
 * FAQPage Schema Generator
 *
 * Generates Schema.org FAQPage structured data
 * for FAQ sections on pages.
 */

export interface FAQItem {
	question: string;
	answer: string;
}

/**
 * Generate FAQPage schema from array of Q&A items
 */
export function generateFAQSchema(faqs: FAQItem[]) {
	return {
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
}

/**
 * Generate FAQPage schema from service FAQs
 */
export function generateServiceFAQSchema(
	faqs: Array<{ question: string; answer: string }>,
) {
	return generateFAQSchema(faqs);
}
