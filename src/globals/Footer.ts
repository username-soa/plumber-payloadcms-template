import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidateGlobal";

export const Footer: GlobalConfig = {
	slug: "footer",
	label: "Footer",
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [revalidateGlobal("footer")],
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "CTA",
					fields: [
						{
							name: "cta",
							type: "group",
							label: "Call to Action",
							fields: [
								{
									name: "headline",
									type: "text",
									required: true,
								},
								{
									name: "subheadline",
									type: "text",
									required: true,
								},
								{
									name: "primaryButtonText",
									type: "text",
									required: true,
								},
								{
									name: "primaryButtonLink",
									type: "text",
									required: true,
									defaultValue: "/contact",
								},
								{
									name: "secondaryButtonText",
									type: "text",
									required: true,
								},
							],
						},
					],
				},
				{
					label: "Links",
					fields: [
						{
							name: "navLinks",
							type: "array",
							label: "Footer Links",
							fields: [
								{
									name: "label",
									type: "text",
									required: true,
								},
								{
									name: "href",
									type: "text",
									required: true,
								},
							],
						},
					],
				},
				{
					label: "Bottom Links",
					fields: [
						{
							name: "copyrightText",
							type: "text",
							admin: {
								description:
									"Use {year} to insert current year and {brand} for brand name",
							},
						},
						{
							name: "bottomLinks",
							type: "array",
							label: "Bottom Links",
							fields: [
								{
									name: "label",
									type: "text",
									required: true,
								},
								{
									name: "href",
									type: "text",
									required: true,
								},
								{
									name: "newTab",
									type: "checkbox",
									label: "Open in new tab",
									defaultValue: false,
								},
							],
						},
					],
				},
			],
		},
	],
};
