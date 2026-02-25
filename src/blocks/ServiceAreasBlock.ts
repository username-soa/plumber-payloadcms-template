import { Block } from "payload";
import { background } from "@/fields/background";

export const ServiceAreasBlock: Block = {
	slug: "serviceAreas",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "ServiceAreasLabel",
			},
		},
	},
	labels: {
		singular: "Service Area",
		plural: "Service Areas",
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
					name: "title",
					type: "text",
					label: "Section Title (Small)",
					defaultValue: "Service Areas",
					admin: {
						width: "50%",
					},
				},
				{
					name: "useGlobalServiceAreas",
					type: "checkbox",
					label: "Use Global Service Areas from Company Info",
					defaultValue: true,
					admin: {
						width: "50%",
						style: { paddingTop: "24px" },
						description: "Default to Global Service Areas from Company Info",
					},
				},
			],
		},

		{
			type: "row",
			fields: [
				{
					name: "headline",
					type: "text",
					label: "Main Headline",
					defaultValue: "Proudly Serving Your Community",
					admin: {
						width: "50%",
					},
				},
				{
					name: "highlightedHeadlineText",
					type: "text",
					label: "Highlighted Text in Headline",
					admin: {
						width: "50%",
						description:
							"Text to be highlighted with primary color within the headline (if applicable)",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "description",
					type: "textarea",
					label: "Description",
					admin: {
						width: "50%",
						description: "Text displayed Above the service areas grid.",
					},
				},
				{
					name: "bottomText",
					type: "textarea",
					label: "Bottom Text (SEO)",
					admin: {
						width: "50%",
						description: "Text displayed Below the service areas grid.",
					},
				},
			],
		},
		{
			name: "customServiceAreas",
			type: "array",
			label: "Custom Service Areas",
			admin: {
				condition: (_, siblingData) => !siblingData.useGlobalServiceAreas,
			},
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
			],
		},
	],
};
