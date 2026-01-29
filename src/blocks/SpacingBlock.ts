import type { Block } from "payload";

export const SpacingBlock: Block = {
	slug: "spacing",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "SpacingLabel",
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
						"Add vertical spacing between content blocks. Choose from small, medium, or large spacing sizes.",
				},
			},
		},
		{
			name: "size",
			type: "select",
			options: [
				{ label: "Small", value: "small" },
				{ label: "Default", value: "medium" },
				{ label: "Large", value: "large" },
			],
			defaultValue: "medium",
			required: true,
		},
	],
};
