import type { Block } from "payload";
import { background } from "@/fields/background";

import { link } from "@/fields/link";

export const HighlightedServicesBlock: Block = {
	slug: "highlightedServices",
	labels: {
		singular: "Highlighted Services",
		plural: "Highlighted Services Blocks",
	},
	fields: [
		background,
		{
			name: "tag",
			type: "text",
			label: "Tag (Top Label)",
		},
		{
			name: "title",
			type: "text",
			label: "Title",
			required: true,
		},
		{
			name: "highlightedText",
			type: "text",
			label: "Highlighted Text (within Title)",
			admin: {
				description: "Text to highlight within the Title. Case-sensitive.",
			},
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
		},
		{
			name: "emergencyService",
			type: "relationship",
			relationTo: "services",
			hasMany: false,
			label: "Emergency Service (Optional)",
			admin: {
				description:
					"Select a service to highlight as the emergency service (e.g. 24/7). This will appear first.",
			},
		},
		{
			name: "selectedServices",
			type: "relationship",
			relationTo: "services",
			hasMany: true,
			label: "Select Services",
			required: true,
			minRows: 1,
			maxRows: 6,
		},
		{
			type: "row",
			fields: [
				{
					name: "layout",
					type: "select",
					label: "Layout",
					defaultValue: "grid",
					options: [
						{ label: "Grid", value: "grid" },
						{ label: "Carousel", value: "carousel" },
					],
					admin: {
						width: "50%",
					},
				},
				link({
					name: "cta",
					label: "Call to Action (Optional)",
					overrides: {
						admin: {
							width: "50%",
						},
					},
				}),
			],
		},
		{
			name: "linkToAllServices",
			type: "checkbox",
			label: "Add 'View All Services' Link? (Deprecated - use CTA above)",
			defaultValue: false,
			admin: {
				description:
					"Legacy option. Prefer using the Call to Action field above.",
			},
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
