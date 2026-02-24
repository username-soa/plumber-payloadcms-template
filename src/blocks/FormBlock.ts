import { Block } from "payload";
import { background } from "@/fields/background";
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";
import { FeatureListBlock } from "./FeatureListBlock";
import { WorkflowStepBlock } from "./WorkflowStepBlock";
import { SimpleStatsBlock } from "./SimpleStatsBlock";
import { CustomColorFeature } from "@/components/richtext/features/custom-color/CustomColorFeature";

export const FormBlock: Block = {
	slug: "formBlock",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "FormLabel",
			},
		},
	},
	labels: {
		singular: "Form Block",
		plural: "Form Blocks",
	},
	graphQL: {
		singularName: "FormBlock",
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
			name: "form",
			type: "relationship",
			relationTo: "forms",
			required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "enableIntro",
					type: "checkbox",
					label: "Enable Intro Content",
					defaultValue: false,
					admin: { width: "50%" },
				},
				{
					name: "enableHeader",
					type: "checkbox",
					label: "Enable Content Above Form",
					defaultValue: false,
					admin: { width: "50%" },
				},
			],
		},

		{
			type: "row",
			fields: [
				{
					name: "enableFooter",
					type: "checkbox",
					label: "Enable Content Below Form",
					defaultValue: false,
					admin: { width: "50%" },
				},
				{
					name: "enableBorder",
					type: "checkbox",
					label: "Show Border & Shadow",
					defaultValue: true,
					admin: { width: "50%" },
				},
			],
		},
		{
			name: "introContent",
			type: "richText",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					CustomColorFeature(),
					...defaultFeatures,
					BlocksFeature({
						blocks: [FeatureListBlock, WorkflowStepBlock, SimpleStatsBlock],
					}),
				],
			}),
			admin: {
				condition: (_, { enableIntro }) => Boolean(enableIntro),
			},
		},

		{
			name: "headerContent",
			type: "richText",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					CustomColorFeature(),
					...defaultFeatures,
					BlocksFeature({
						blocks: [FeatureListBlock, WorkflowStepBlock, SimpleStatsBlock],
					}),
				],
			}),
			admin: {
				condition: (_, { enableHeader }) => Boolean(enableHeader),
			},
		},

		{
			name: "footerContent",
			type: "richText",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					CustomColorFeature(),
					...defaultFeatures,
					BlocksFeature({
						blocks: [FeatureListBlock, WorkflowStepBlock, SimpleStatsBlock],
					}),
				],
			}),
			admin: {
				condition: (_, { enableFooter }) => Boolean(enableFooter),
			},
		},
	],
};
