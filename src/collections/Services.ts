import type { CollectionConfig } from "payload";
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";

import { hero } from "../fields/hero";

export const Services: CollectionConfig = {
	slug: "services",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
	},

	fields: [
		hero,
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
							name: "parentService",
							type: "relationship",
							relationTo: "services",
							hasMany: false,
							label: "Parent Service",
							filterOptions: ({ id }) => {
								return {
									id: {
										not_equals: id,
									},
								};
							},
							admin: {
								position: "sidebar",
							},
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
