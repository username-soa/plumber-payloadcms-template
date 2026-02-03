import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
	slug: "faqs",
	admin: {
		useAsTitle: "question",
		defaultColumns: ["question", "updatedAt"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "question",
			type: "text",
			required: true,
		},
		{
			name: "answer",
			type: "textarea",
			required: true,
		},
	],
};
