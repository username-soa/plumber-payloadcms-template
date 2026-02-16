import type { Block } from "payload";
import { background } from "@/fields/background";

export const LegalHeroBlock: Block = {
	slug: "legalHero",
	labels: {
		singular: "Legal Hero",
		plural: "Legal Heroes",
	},
	fields: [
		background,
		{
			name: "badge",
			type: "text",
			label: "Badge Label",
			admin: {
				placeholder: "Legal Document",
			},
		},
		{
			name: "title",
			type: "text",
			label: "Override Title",
			admin: {
				description: "Defaults to page title if empty",
			},
		},
		{
			name: "subtitle",
			type: "textarea",
			label: "Subtitle",
		},
		{
			name: "icon",
			type: "select",
			label: "Icon",
			options: [
				{ label: "Shield (Privacy)", value: "shield" },
				{ label: "File (Terms)", value: "file" },
			],
			defaultValue: "shield",
		},
		{
			name: "showLastUpdated",
			type: "checkbox",
			label: "Show Last Updated Date",
			defaultValue: true,
		},
	],
};
