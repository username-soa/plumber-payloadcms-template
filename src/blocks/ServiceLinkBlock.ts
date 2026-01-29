import type { Block } from "payload";

export const ServiceLinkBlock: Block = {
	slug: "serviceLink",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "ServiceLinkLabel",
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
						"Insert a styled link to another service page on your site. Great for cross-referencing related services.",
				},
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "serviceSlug",
					type: "text",
					required: true,
					label: "Service Slug",
					admin: {
						width: "50%",
						description:
							"Enter the slug of the service page (e.g. 'drain-cleaning')",
					},
				},
				{
					name: "customText",
					type: "text",
					label: "Custom Link Text",
					admin: {
						width: "50%",
						description: "Override the default link text (optional)",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing above this block",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing below this block",
					},
				},
			],
		},
	],
};
