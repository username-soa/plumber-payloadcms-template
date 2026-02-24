import type { Block } from "payload";
import { background } from "@/fields/background";

export const CTABlock: Block = {
	slug: "cta",
	labels: {
		singular: "Call to Action",
		plural: "Call to Actions",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "CTALabel",
			},
		},
	},
	fields: [
		{
			name: "blockDescription",
			type: "ui",
			admin: {
				components: {
					Field: {
						path: "@/components/payload/BlockDescription",
					},
				},
				custom: {
					description:
						"Create a prominent call-to-action section with a heading, description, and button to encourage user engagement.",
				},
			},
		},
		background,
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Adds extra spacing above the CTA section",
						width: "50%",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Adds extra spacing below the CTA section",
						width: "50%",
					},
				},
			],
		},
		{
			name: "heading",
			type: "text",
			label: "CTA Title",
			required: true,
			admin: {
				description: "The main heading text for the call to action section",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "buttonText",
					type: "text",
					label: "Button Text",
					required: true,
					admin: {
						description: "The text displayed on the CTA button",
						width: "50%",
					},
				},
				{
					name: "buttonLink",
					type: "text",
					label: "Button Link",
					required: true,
					admin: {
						description: "The URL or path the button links to (e.g., /contact)",
						width: "50%",
					},
				},
			],
		},
		{
			name: "description",
			type: "textarea",
			label: "CTA Description",
			admin: {
				description: "Optional supporting text that appears below the heading",
			},
		},
	],
};
