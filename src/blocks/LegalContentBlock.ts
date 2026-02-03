import type { Block } from "payload";
import { customLexical } from "@/lib/lexical-config";

export const LegalContentBlock: Block = {
	slug: "legalContent",
	labels: {
		singular: "Content",
		plural: "Content Blocks",
	},
	fields: [
		{
			name: "content",
			type: "richText",
			editor: customLexical,
			required: true,
		},
	],
};
