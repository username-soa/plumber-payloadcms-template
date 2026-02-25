import type { Block } from "payload";
import { background } from "@/fields/background";
import {
	lexicalEditor,
	BlocksFeature,
	FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";
import { FeatureListBlock } from "./FeatureListBlock";
import { WorkflowStepBlock } from "./WorkflowStepBlock";
import { SimpleStatsBlock } from "./SimpleStatsBlock";
import { TableBlock } from "./TableBlock";
import { link } from "@/fields/link";

import { CustomColorFeature } from "@/components/richtext/features/custom-color/CustomColorFeature";

export const DualColumnBlock: Block = {
	slug: "dualColumn",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "DualColumnLabel",
			},
		},
	},
	labels: {
		singular: "Dual Column",
		plural: "Dual Columns",
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
			name: "columns",
			type: "array",
			label: "Columns",
			minRows: 2,
			maxRows: 2,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "type",
							type: "select",
							defaultValue: "content",
							options: [
								{ label: "Content", value: "content" },
								{ label: "Image", value: "image" },
							],
							admin: {
								width: "100%",
							},
						},
					],
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === "image",
					},
				},
				{
					name: "enableImageLink",
					type: "checkbox",
					label: "Enable Image Link",
					admin: {
						condition: (_, siblingData) => siblingData.type === "image",
					},
				},
				link({
					name: "imageLink",
					label: "Image Link",
					overrides: {
						admin: {
							condition: (_, siblingData) =>
								siblingData.type === "image" && siblingData.enableImageLink,
						},
					},
				}),
				{
					name: "richText",
					type: "richText",
					editor: lexicalEditor({
						features: ({ defaultFeatures }) => [
							CustomColorFeature(),
							...defaultFeatures,
							BlocksFeature({
								blocks: [
									FeatureListBlock,
									WorkflowStepBlock,
									SimpleStatsBlock,
									TableBlock,
								],
							}),
							FixedToolbarFeature(),
						],
					}),
					admin: {
						condition: (_, siblingData) => siblingData.type === "content",
					},
				},
				{
					name: "links",
					type: "array",
					label: "Links / Buttons",
					fields: [link()],
					admin: {
						condition: (_, siblingData) => siblingData.type === "content",
					},
				},
			],
		},
	],
};
