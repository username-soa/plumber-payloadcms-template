import type { Block } from "payload";

export const CardsGridBlock: Block = {
	slug: "cardsGrid",
	labels: {
		singular: "Cards Grid",
		plural: "Cards Grids",
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "columns",
					type: "select",
					label: "Items per Row",
					defaultValue: "3",
					options: [
						{ label: "1", value: "1" },
						{ label: "2", value: "2" },
						{ label: "3", value: "3" },
						{ label: "4", value: "4" },
						{ label: "5", value: "5" },
						{ label: "6", value: "6" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "cardLayout",
					type: "select",
					label: "Card Layout",
					defaultValue: "stacked",
					options: [
						{ label: "Stacked (Icon on top)", value: "stacked" },
						{ label: "Side-by-Side (Icon on left)", value: "sideBySide" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "enableHighlight",
					type: "checkbox",
					label: "Enable Highlight Effect",
					defaultValue: true,
					admin: {
						description:
							"If enabled, cards will show a shadow and primary color border on hover, and icons will turn primary color.",
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
			name: "cards",
			type: "array",
			label: "Cards",
			minRows: 1,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "icon",
							type: "text",
							label: "Icon",
							admin: {
								components: {
									Field: "@/components/payload/IconPicker#IconPicker",
								},
								width: "50%",
							},
						},
						{
							name: "title",
							type: "text",
							label: "Title",
							required: true,
							admin: {
								width: "50%",
							},
						},
					],
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
				},
				{
					name: "link",
					type: "text",
					label: "Link (Optional URL)",
				},
			],
		},
	],
};
