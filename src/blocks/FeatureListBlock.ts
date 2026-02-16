import type { Block } from "payload";
import { background } from "@/fields/background";

export const FeatureListBlock: Block = {
	slug: "featureList",
	labels: {
		singular: "Feature List",
		plural: "Feature Lists",
	},
	fields: [
		background,
		{
			name: "layout",
			type: "select",
			defaultValue: "default",
			options: [
				{ label: "Default (List)", value: "default" },
				{ label: "Pills (Horizontal Badges)", value: "pills" },
			],
			admin: {
				description:
					"Choose 'Pills' for checkmark badges layout (e.g. Licensed & Insured)",
			},
		},
		{
			name: "features",
			type: "array",
			label: "Features",
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
								condition: (data, _siblingData, { blockData }) => {
									// blockData is the data of the block that this field is in
									const layout = blockData?.layout;
									return layout !== "pills";
								},
								width: "50%",
							},
						},
						{
							name: "text",
							type: "text",
							label: "Text",
							required: true,
							admin: {
								width: "50%",
							},
						},
					],
				},
			],
		},
	],
};
