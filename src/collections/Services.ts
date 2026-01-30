import type { CollectionConfig } from "payload";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Services: CollectionConfig = {
	slug: "services",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
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
						},
						{
							name: "description",
							type: "textarea",
							label: "Short Description",
							required: true,
						},
						{
							name: "longDescription",
							type: "richText",
							label: "Long Description",
						},
						{
							name: "icon",
							type: "text",
							required: true,
							admin: {
								components: {
									Field: "@/components/payload/IconPicker#IconPicker",
								},
							},
						},
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "isEmergency",
							type: "checkbox",
							label: "Emergency Service?",
							defaultValue: false,
							admin: {
								position: "sidebar",
							},
						},
						{
							name: "availability",
							type: "text",
							label: 'Availability (e.g., "24/7")',
							admin: {
								position: "sidebar",
							},
						},
						{
							name: "subServices",
							type: "array",
							label: "Sub Services",
							fields: [
								{
									name: "title",
									type: "text",
									required: true,
								},
								{
									name: "description",
									type: "textarea",
								},
								{
									name: "icon",
									type: "text",
									admin: {
										components: {
											Field: "@/components/payload/IconPicker#IconPicker",
										},
									},
								},
							],
						},
						{
							name: "faqs",
							type: "array",
							label: "FAQs",
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
							// if the `generateUrl` function is configured
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
