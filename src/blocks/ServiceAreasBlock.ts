import { Block } from "payload";

export const ServiceAreasBlock: Block = {
	slug: "serviceAreasBlock", // camelCase standard for blocks
	labels: {
		singular: "Service Areas Block",
		plural: "Service Areas Blocks",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "Section Title (Small)",
			defaultValue: "Service Areas",
		},
		{
			name: "headline",
			type: "text",
			label: "Main Headline",
			defaultValue: "Proudly Serving Your Community",
		},
		{
			name: "highlightedHeadlineText",
			type: "text",
			label: "Highlighted Text in Headline",
			admin: {
				description:
					"Text to be highlighted with primary color within the headline (if applicable)",
			},
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
		},
		{
			type: "row",
			fields: [
				{
					name: "useGlobalServiceAreas",
					type: "checkbox",
					label: "Use Global Service Areas from Company Info",
					defaultValue: true,
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
		{
			name: "bottomText",
			type: "textarea",
			label: "Bottom Text (SEO)",
			admin: {
				description: "Text displayed below the service areas grid.",
			},
		},
	],
};
