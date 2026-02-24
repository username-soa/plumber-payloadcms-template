import type { Block } from "payload";
import { link } from "@/fields/link";

export const MarqueeBlock: Block = {
	slug: "marquee",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "MarqueeLabel",
			},
		},
	},
	labels: {
		singular: "Marquee",
		plural: "Marquees",
	},

	fields: [
		{
			name: "animation",
			type: "group",
			label: "Animation",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "direction",
							type: "select",
							defaultValue: "left",
							options: [
								{ label: "To Left", value: "left" },
								{ label: "To Right", value: "right" },
							],
							admin: {
								width: "25%",
							},
						},
						{
							name: "speed",
							type: "number",
							label: "Speed",
							defaultValue: 40,
							admin: {
								width: "25%",
								description: "Speed in seconds (lower is faster)",
							},
						},
						{
							name: "gap",
							type: "number",
							label: "Gap",
							defaultValue: 40,
							admin: {
								width: "25%",
								description: "Spacing between items in pixels",
							},
						},
						{
							name: "verticalPadding",
							type: "number",
							label: "Vertical Padding (px)",
							defaultValue: 80,
							min: 0,
							admin: {
								width: "25%",
							},
						},
					],
				},
				{
					type: "row",
					fields: [
						{
							name: "fadeEdges",
							type: "checkbox",
							label: "Fade Edges",
							defaultValue: true,
							admin: {
								width: "50%",
								description: "Add a soft fade effect to the edges",
							},
						},
						{
							name: "pauseOnHover",
							type: "checkbox",
							label: "Pause on Hover",
							defaultValue: true,
							admin: {
								width: "50%",
								description: "Stop animation when mouse is over",
							},
						},
					],
				},
			],
		},
		{
			name: "style",
			type: "group",
			label: "Style",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "bg",
							type: "text",
							label: "Background Color",
							defaultValue: "transparent",
							admin: {
								width: "50%",
								components: {
									Field: "@/components/payload/ColorPicker#ColorPicker",
								},
							},
						},
						{
							name: "decoration",
							type: "select",
							label: "Decoration",
							defaultValue: "none",
							options: [
								{ label: "None", value: "none" },
								{ label: "Dots", value: "dots" },
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
							name: "textColor",
							type: "text",
							label: "Text Color",
							defaultValue: "#000000",
							admin: {
								width: "50%",
								components: {
									Field: "@/components/payload/ColorPicker#ColorPicker",
								},
							},
						},
						{
							name: "fontWeight",
							type: "select",
							label: "Font Weight",
							defaultValue: "400",
							options: [
								{ label: "Thin (100)", value: "100" },
								{ label: "Light (300)", value: "300" },
								{ label: "Normal (400)", value: "400" },
								{ label: "Medium (500)", value: "500" },
								{ label: "Semi Bold (600)", value: "600" },
								{ label: "Bold (700)", value: "700" },
								{ label: "Black (900)", value: "900" },
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
							name: "fontSize",
							type: "number",
							label: "Font Size (px)",
							defaultValue: 32,
							admin: {
								width: "50%",
							},
						},
						{
							name: "letterSpacing",
							type: "number",
							label: "Letter Spacing (px)",
							defaultValue: 0,
							admin: {
								width: "50%",
							},
						},
					],
				},
			],
		},
		{
			name: "separator",
			type: "group",
			label: "Item Separator",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "type",
							type: "select",
							defaultValue: "icon",
							options: [
								{ label: "None", value: "none" },
								{ label: "Icon", value: "icon" },
							],
							admin: {
								width: "50%",
							},
						},
						{
							name: "size",
							type: "number",
							label: "Icon Size (px)",
							defaultValue: 24,
							admin: {
								width: "50%",
								condition: (_, siblingData) => siblingData?.type !== "none",
							},
						},
					],
				},
				{
					name: "icon",
					type: "text",
					label: "Separator Icon",
					admin: {
						components: {
							Field: "@/components/payload/IconPicker#IconPicker",
						},
						condition: (_, siblingData) => siblingData?.type === "icon",
					},
				},
			],
		},
		{
			name: "items",
			type: "array",
			label: "Marquee Items",
			minRows: 1,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "type",
							type: "select",
							defaultValue: "text",
							options: [
								{ label: "Text", value: "text" },
								{ label: "Image/Logo", value: "image" },
							],
							admin: {
								width: "30%",
							},
						},
						{
							name: "text",
							type: "text",
							label: "Text Content",
							admin: {
								width: "70%",
								condition: (_, siblingData) => siblingData?.type === "text",
							},
						},
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							label: "Image/Logo",
							admin: {
								width: "70%",
								condition: (_, siblingData) => siblingData?.type === "image",
							},
						},
					],
				},
				link({
					name: "link",
					required: false,
					overrides: {
						admin: {
							description: "Optional link for the marquee item",
						},
					},
				}),
			],
		},
	],
};
