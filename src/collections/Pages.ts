import type { CollectionConfig } from "payload";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { LegalHeroBlock } from "@/blocks/LegalHeroBlock";
import { LegalContentBlock } from "@/blocks/LegalContentBlock";
import { LegalContactBlock } from "@/blocks/LegalContactBlock";
import { BackLinkBlock } from "@/blocks/BackLinkBlock";
import { populateLegalContact } from "@/hooks/populateLegalContact";

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
	},
	versions: {
		drafts: true,
	},
	access: {
		read: ({ req: { user } }) => {
			if (user) return true;
			return {
				status: {
					equals: "published",
				},
			};
		},
	},
	hooks: {
		afterRead: [populateLegalContact],
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "hero",
							type: "group",
							fields: [
								{
									name: "type",
									type: "select",
									defaultValue: "default",
									options: [
										{ label: "Default (Centered)", value: "default" },
										{ label: "High Impact (Split)", value: "highImpact" },
										{ label: "Service (Icon)", value: "service" },
										{ label: "Minimal (Legal)", value: "minimal" },
										{ label: "None", value: "none" },
									],
									required: true,
								},
								// Content Fields
								{
									name: "title",
									type: "text",
									admin: {
										condition: (_, { type } = {}) =>
											["default", "highImpact", "minimal", "service"].includes(
												type,
											),
									},
								},
								{
									name: "titleHighlight",
									type: "text",
									label: "Title Highlight",
									admin: {
										description:
											"Text to highlight in primary color (case-insensitive)",
										condition: (_, { type } = {}) =>
											["highImpact", "minimal"].includes(type),
									},
								},
								{
									name: "description",
									type: "textarea",
									admin: {
										condition: (_, { type } = {}) =>
											["default", "highImpact", "minimal", "service"].includes(
												type,
											),
									},
								},
								{
									name: "floatingText",
									type: "textarea",
									label: "Floating Text (Above Image)",
									admin: {
										condition: (_, { type } = {}) => type === "highImpact",
									},
								},
								{
									name: "badge",
									type: "text",
									admin: {
										condition: (_, { type } = {}) =>
											["default", "minimal", "service"].includes(type),
									},
								},
								{
									name: "badgeVariant",
									type: "select",
									defaultValue: "default",
									options: [
										{ label: "Default", value: "default" },
										{ label: "Secondary", value: "secondary" },
										{ label: "Destructive", value: "destructive" },
										{ label: "Outline", value: "outline" },
									],
									admin: {
										condition: (_, { type } = {}) =>
											["default", "minimal", "service"].includes(type),
									},
								},
								{
									name: "badgeSize",
									type: "select",
									defaultValue: "default",
									options: [
										{ label: "Small", value: "sm" },
										{ label: "Default", value: "default" },
										{ label: "Large", value: "lg" },
									],
									admin: {
										condition: (_, { type } = {}) =>
											["default", "minimal", "service"].includes(type),
									},
								},
								// Media
								{
									name: "bgImage",
									type: "upload",
									relationTo: "media",
									label: "Background Image",
									required: true,
									admin: {
										condition: (_, { type } = {}) =>
											["default", "highImpact"].includes(type),
									},
								},
								{
									name: "fgImage",
									type: "upload",
									relationTo: "media",
									label: "Foreground Image / Inset",
									admin: {
										condition: (_, { type } = {}) => type === "highImpact",
									},
								},
								{
									name: "icon",
									type: "text",
									label: "Icon",
									admin: {
										components: {
											Field: "@/components/payload/IconPicker#IconPicker",
										},
										condition: (_, { type } = {}) =>
											["service", "minimal"].includes(type),
									},
								},
								{
									name: "heroTheme",
									type: "select",
									defaultValue: "muted",
									options: [
										{ label: "Muted (Default)", value: "muted" },
										{ label: "Primary Gradient", value: "primary-gradient" },
									],
									admin: {
										condition: (_, { type } = {}) => type === "minimal",
									},
								},
								// Actions
								{
									name: "links",
									type: "array",
									maxRows: 2,
									admin: {
										condition: (_, { type } = {}) =>
											["default", "highImpact"].includes(type),
									},
									fields: [
										{
											name: "link",
											type: "group", // mimicking a standard link field structure if we don't have the custom field handy
											fields: [
												{
													name: "type",
													type: "radio",
													options: [
														{ label: "Internal", value: "reference" },
														{ label: "Custom URL", value: "custom" },
														{ label: "Email", value: "email" },
														{ label: "Phone", value: "phone" },
														{ label: "Badge", value: "badge" },
													],
													defaultValue: "reference",
												},
												{
													name: "label",
													type: "text",
													required: true,
												},
												{
													name: "url",
													type: "text",
													label: "Custom URL",
													required: true,
													admin: {
														condition: (_, siblingData) =>
															siblingData?.type === "custom",
													},
												},
												{
													name: "newTab",
													type: "checkbox",
													label: "Open in new tab",
													admin: {
														condition: (_, siblingData) =>
															siblingData?.type === "custom",
													},
												},
												{
													name: "email",
													type: "text",
													label: "Email Address",
													required: true,
													admin: {
														condition: (_, siblingData) =>
															siblingData?.type === "email",
													},
												},
												{
													name: "phoneNumber",
													type: "text",
													label: "Phone Number",
													required: true,
													admin: {
														condition: (_, siblingData) =>
															siblingData?.type === "phone",
													},
												},
												{
													name: "reference",
													type: "relationship",
													relationTo: ["pages", "services"],
													admin: {
														condition: (_, siblingData) =>
															siblingData?.type === "reference",
													},
												},
												{
													name: "style",
													type: "select",
													defaultValue: "primary",
													options: [
														{ label: "Primary Button", value: "primary" },
														{ label: "Secondary Button", value: "secondary" },
														{ label: "Outline", value: "outline" },
														{ label: "Link/Ghost", value: "ghost" },
														{ label: "Destructive", value: "destructive" },
														{ label: "Badge", value: "badge" },
														{
															label: "Badge (Pulsing)",
															value: "badge-pulsing",
														},
													],
												},
											],
										},
									],
								},
								// Options
								{
									name: "showDate",
									type: "checkbox",
									admin: {
										condition: (_, { type } = {}) => type === "minimal",
									},
								},
								{
									name: "breadcrumbs",
									type: "checkbox",
									defaultValue: true,
									admin: {
										condition: (_, { type } = {}) => type === "service",
									},
								},
							],
						},

						{
							name: "title",
							type: "text",
							required: true,
						},
						{
							name: "slug",
							type: "text",
							required: true,
							unique: true,
							admin: {
								position: "sidebar",
								components: {
									Field: "@/components/payload/SlugField#SlugField",
								},
							},
							hooks: {
								beforeValidate: [
									async ({ value, data }) => {
										if (value || !data?.title) return value;
										return data.title
											.toLowerCase()
											.replace(/ /g, "-")
											.replace(/[^\w-]+/g, "");
									},
								],
							},
						},
						{
							name: "lastUpdated",
							type: "date",
							admin: {
								position: "sidebar",
								description: "The 'Last updated' date shown on the page",
							},
						},
						{
							name: "status",
							type: "select",
							options: [
								{ label: "Draft", value: "draft" },
								{ label: "Published", value: "published" },
							],
							defaultValue: "draft",
							required: true,
							admin: {
								position: "sidebar",
							},
						},
						{
							name: "layout",
							type: "blocks",
							required: true,
							blocks: [
								LegalHeroBlock,
								LegalContentBlock,
								LegalContactBlock,
								BackLinkBlock,
							],
						},
					],
				},
				{
					label: "SEO",
					name: "meta",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaDescriptionField({}),
						MetaImageField({
							relationTo: "media",
						}),
						PreviewField({
							hasGenerateFn: true,
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
	],
};
