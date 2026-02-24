import type { Block } from "payload";
import { background } from "@/fields/background";

import { link } from "@/fields/link";

export const HighlightedServicesBlock: Block = {
	slug: "highlightedServices",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "HighlightedServicesLabel",
			},
		},
	},
	labels: {
		singular: "Highlighted Service",
		plural: "Highlighted Services",
	},
	fields: [
		background,
		{
			type: "row",
			fields: [
				{
					name: "tag",
					type: "text",
					label: "Tag (Top Label)",
					admin: {
						width: "50%",
					},
				},
				{
					name: "linkToAllServices",
					type: "checkbox",
					label: "Add 'View All Services' Link? (Deprecated - use CTA above)",
					defaultValue: false,
					admin: {
						width: "50%",
						style: {
							paddingTop: "24px",
						},
						description:
							"Legacy option. Prefer using the Call to Action field above.",
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
					label: "Title",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "highlightedText",
					type: "text",
					label: "Highlighted Text (within Title)",
					admin: {
						width: "50%",

						description: "Text to highlight within the Title. Case-sensitive.",
					},
				},
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
			],
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
			name: "description",
			type: "textarea",
			label: "Description",
		},
		link({
			name: "cta",
			label: "Call to Action (Optional)",
			overrides: {
				admin: {
					condition: (_, siblingData) => siblingData.linkToAllServicess,
				},
			},
		}),
	],
};
