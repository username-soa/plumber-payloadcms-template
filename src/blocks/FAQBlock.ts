import type { Block } from "payload";
import { link } from "@/fields/link";
import { background } from "@/fields/background";

export const FAQBlock: Block = {
	slug: "faq",
	labels: {
		singular: "FAQ",
		plural: "FAQs",
	},

	fields: [
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					defaultValue: "Your Questions, Our Answers",
					admin: {
						width: "50%",
					},
				},
				{
					name: "titleHighlight",
					type: "text",
					label: "Title Highlight",
					admin: {
						width: "50%",
						description:
							"Text to highlight in primary color (case-insensitive)",
					},
				},
			],
		},
		background,
		{
			name: "description",
			type: "textarea",
			defaultValue:
				"Have questions about our plumbing services? We're here to make everything clear. From booking to pricing, find your answers here.",
		},
		{
			name: "faqs",
			type: "relationship",
			relationTo: "faqs",
			hasMany: true,
			label: "Selected FAQs",
		},
		{
			name: "cta",
			type: "group",
			label: "Call to Action Card",
			fields: [
				{
					name: "showCta",
					type: "checkbox",
					label: "Show CTA Card",
					defaultValue: true,
				},
				{
					name: "headline",
					type: "text",
					defaultValue: "Still Have Questions?",
				},
				{
					name: "text",
					type: "textarea",
					defaultValue:
						"Can't find the answer you're looking for? Our team is here to help!",
				},
				link({
					overrides: {
						name: "ctaLink",
						label: "CTA Link",
					},
				}),
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "paddingTopOption",
					type: "select",
					label: "Padding Top",
					defaultValue: "default",
					options: [
						{ label: "None", value: "none" },
						{ label: "Small", value: "small" },
						{ label: "Default", value: "default" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "paddingBottomOption",
					type: "select",
					label: "Padding Bottom",
					defaultValue: "default",
					options: [
						{ label: "None", value: "none" },
						{ label: "Small", value: "small" },
						{ label: "Default", value: "default" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
	],
};
