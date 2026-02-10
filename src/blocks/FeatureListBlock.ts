import type { Block } from "payload";

export const FeatureListBlock: Block = {
	slug: "featureList",
	labels: {
		singular: "Feature List",
		plural: "Feature Lists",
	},
	fields: [
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
								width: "30%",
							},
						},
						{
							name: "text",
							type: "text",
							label: "Text",
							required: true,
							admin: {
								width: "70%",
							},
						},
					],
				},
			],
		},
	],
};
