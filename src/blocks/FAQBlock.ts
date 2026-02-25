import type { Block } from "payload";
import { link } from "@/fields/link";
import { background } from "@/fields/background";

export const FAQBlock: Block = {
	slug: "faq",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "FAQLabel",
			},
		},
	},
	labels: {
		singular: "FAQ",
		plural: "FAQs",
	},

	fields: [
		background,
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
		{
			type: "row",
			fields: [
				{
					name: "tag",
					type: "text",
					defaultValue: "FAQ",
					admin: {
						width: "50%",
					},
				},
				{
					name: "type",
					type: "select",
					defaultValue: "default",
					options: [
						{ label: "Default (2 columns Design)", value: "default" },
						{ label: "Simple (Centered)", value: "simple" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
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
			admin: {
				condition: (_, siblingData) => siblingData.type !== "simple",
			},
			fields: [
				{
					name: "showCta",
					type: "checkbox",
					label: "Show CTA Card",
					defaultValue: true,
				},
				{
					type: "row",
					admin: {
						condition: (_, siblingData) => siblingData?.showCta !== false,
					},
					fields: [
						{
							name: "headline",
							type: "text",
							defaultValue: "Still Have Questions?",
							admin: { width: "50%" },
						},
						{
							name: "text",
							type: "textarea",
							defaultValue:
								"Can't find the answer you're looking for? Our team is here to help!",
							admin: { width: "50%" },
						},
					],
				},

				link({
					overrides: {
						name: "ctaLink",
						label: "CTA Link",
						admin: {
							condition: (_, siblingData) => siblingData?.showCta !== false,
						},
					},
				}),
			],
		},
	],
};
