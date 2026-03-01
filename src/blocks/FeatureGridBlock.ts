import type { Block } from "payload";
import { link } from "@/fields/link";

export const FeatureGridBlock: Block = {
	slug: "featureGrid",
	labels: {
		singular: "Feature Grid",
		plural: "Feature Grids",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "FeatureGridLabel",
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
						"Display a grid or list of features with customizable icons, sizes, and layouts.",
				},
			},
		},
		{
			type: "row",
			admin: { style: { paddingTop: "24px" } },
			fields: [
				{
					name: "layout",
					type: "select",
					label: "Layout Direction",
					defaultValue: "column",
					options: [
						{ label: "Column (Vertical List)", value: "column" },
						{ label: "Row (Horizontal Grid)", value: "row" },
					],
					admin: {
						width: "50%",
						description:
							"Choose whether items flow top-to-bottom or left-to-right",
					},
				},
				{
					name: "size",
					type: "select",
					label: "Item Size",
					defaultValue: "medium",
					options: [
						{ label: "Small", value: "small" },
						{ label: "Medium", value: "medium" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
						description: "Set the size of the icons and numbers globally",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "titleSize",
					type: "select",
					label: "Title Size",
					defaultValue: "normal",
					options: [
						{ label: "Small", value: "small" },
						{ label: "Normal", value: "normal" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
						description: "Set the title font size globally",
					},
				},
				{
					name: "descriptionSize",
					type: "select",
					label: "Description Size",
					defaultValue: "normal",
					options: [
						{ label: "Small", value: "small" },
						{ label: "Normal", value: "normal" },
						{ label: "Big", value: "big" },
					],
					admin: {
						width: "50%",
						description: "Set the description font size globally",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "showBorder",
					type: "checkbox",
					label: "Show Border",
					defaultValue: true,
					admin: {
						description: "Add a border around each item",
						width: "25%",
					},
				},
				{
					name: "showShadow",
					type: "checkbox",
					label: "Show Shadow",
					defaultValue: false,
					admin: {
						description: "Add a subtle shadow to each item",
						width: "25%",
					},
				},
				{
					name: "showIconBackground",
					type: "checkbox",
					label: "Show Icon Background",
					defaultValue: true,
					admin: {
						description: "Add a colored background shape behind the icon",
						width: "25%",
					},
				},
				{
					name: "enableCustomIconColor",
					type: "checkbox",
					label: "Enable Custom Icon Color",
					defaultValue: false,
					admin: {
						description: "Override default primary color",
						width: "25%",
					},
				},
			],
		},
		{
			name: "customIconColor",
			type: "text",
			label: "Custom Icon Color",
			defaultValue: "transparent",
			admin: {
				components: {
					Field: "@/components/payload/ColorPicker#ColorPicker",
				},
				condition: (_, siblingData) =>
					siblingData.enableCustomIconColor === true,
			},
		},
		{
			name: "items",
			type: "array",
			label: "Features/Items",
			minRows: 1,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "iconType",
							type: "select",
							label: "Icon Type",
							defaultValue: "none",
							options: [
								{ label: "None", value: "none" },
								{ label: "Custom Icon (Image)", value: "icon" },
								{ label: "Number", value: "number" },
							],
							admin: { width: "25%" },
						},
						{
							name: "title",
							type: "text",
							label: "Title",
							admin: {
								width: "25%",
							},
						},
						{
							name: "description",
							type: "text",
							label: "Description",
							admin: {
								width: "50%",
							},
						},
						{
							name: "number",
							type: "text",
							label: "Number",
							admin: {
								width: "100%",
								condition: (_, siblingData) =>
									siblingData.iconType === "number",
							},
						},
					],
				},
				{
					name: "customIcon",
					type: "text",
					label: "Custom Icon",
					admin: {
						components: {
							Field: "@/components/payload/IconPicker#IconPicker",
						},
						condition: (_, siblingData) => siblingData.iconType === "icon",
						width: "50%",
					},
				},
				link({
					name: "link",
					required: false,
					overrides: {
						admin: {
							description:
								"Optional link to make the entire feature card clickable",
						},
					},
				}),
			],
		},
	],
};
