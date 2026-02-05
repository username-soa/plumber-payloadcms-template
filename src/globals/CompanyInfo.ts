import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidateGlobal";

export const CompanyInfo: GlobalConfig = {
	slug: "company-info",
	label: "Company Info",
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [revalidateGlobal("company-info")],
	},
	fields: [
		{
			name: "brand",
			type: "group",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					defaultValue: "FlowMasters",
				},
				{
					name: "description",
					type: "textarea",
					required: true,
				},
				{
					name: "logo",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Contact & Socials",
					description:
						"Manage your contact details (phone, email, address) and social media links.",
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "phone",
									type: "text",
									required: true,
									admin: { width: "33%" },
								},
								{
									name: "email",
									type: "email",
									required: true,
									admin: { width: "33%" },
								},
								{
									name: "address",
									type: "text",
									required: true,
									admin: { width: "34%" },
								},
							],
						},
						{
							type: "row",
							fields: [
								{
									name: "socials",
									type: "array",
									admin: {
										width: "50%",
										description: "Links to your social media profiles",
									},
									fields: [
										{
											name: "platform",
											type: "select",
											options: [
												{ label: "Facebook", value: "facebook" },
												{ label: "Instagram", value: "instagram" },
												{ label: "LinkedIn", value: "linkedin" },
												{ label: "Twitter", value: "twitter" },
												{ label: "YouTube", value: "youtube" },
											],
											required: true,
										},
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
								{
									name: "workingHours",
									type: "array",
									admin: {
										width: "50%",
										description: "Your weekly business operating hours",
									},
									fields: [
										{
											name: "day",
											type: "text",
											required: true,
										},
										{
											name: "time",
											type: "text",
											required: true,
										},
									],
								},
							],
						},
					],
				},
				{
					label: "SEO & Business Info",
					fields: [
						{
							name: "seo",
							type: "group",
							label: "SEO Configuration",
							admin: {
								description:
									"Manage overarching business details, location settings, service priorities, and review aggregations for optimizing search engine visibility.",
							},
							fields: [
								{
									type: "tabs",

									tabs: [
										{
											label: "Business & Location",
											fields: [
												{
													type: "row",
													fields: [
														{
															name: "businessType",
															type: "select",
															defaultValue: "Plumber",
															options: [
																{ label: "Plumber", value: "Plumber" },
																{
																	label: "Local Business",
																	value: "LocalBusiness",
																},
																{
																	label: "Home And Construction",
																	value: "HomeAndConstructionBusiness",
																},
															],
															required: true,
															admin: { width: "33%" },
														},
														{
															name: "foundingDate",
															type: "date",
															admin: {
																date: {
																	pickerAppearance: "dayOnly",
																	displayFormat: "d MMM yyy",
																},
																width: "33%",
															},
														},
														{
															name: "phoneDisplay",
															type: "text",
															label: "Display Phone (e.g. (02) 1234 5678)",
															required: true,
															admin: {
																description:
																	"The primary phone number displayed for SEO and services.",
																width: "34%",
															},
														},
													],
												},
												{
													name: "location",
													type: "group",
													label: "Physical Location",
													fields: [
														{
															type: "row",
															fields: [
																{
																	name: "streetAddress",
																	type: "text",
																	required: true,
																	admin: { width: "33%" },
																},
																{
																	name: "city",
																	type: "text",
																	required: true,
																	admin: { width: "33%" },
																},
																{
																	name: "state",
																	type: "text",
																	required: true,
																	admin: { width: "34%" },
																},
															],
														},
														{
															type: "row",
															fields: [
																{
																	name: "stateCode",
																	type: "text",
																	required: true,
																	admin: { width: "33%" },
																},
																{
																	name: "postalCode",
																	type: "text",
																	required: true,
																	admin: { width: "33%" },
																},
																{
																	name: "country",
																	type: "text",
																	required: true,
																	admin: { width: "34%" },
																},
															],
														},
														{
															type: "row",
															fields: [
																{
																	name: "countryCode",
																	type: "text",
																	required: true,
																	admin: { width: "33%" },
																},
																{
																	name: "latitude",
																	type: "text",
																	required: true,
																	admin: { width: "33%" },
																},
																{
																	name: "longitude",
																	type: "text",
																	required: true,
																	admin: { width: "34%" },
																},
															],
														},
													],
												},
											],
										},
										{
											label: "Services",
											fields: [
												{
													type: "row",
													fields: [
														{
															name: "priorityServices",
															type: "relationship",
															relationTo: "services",
															hasMany: true,
															label: "Priority Services",
															admin: {
																width: "50%",
																description:
																	"Services to highlight in Schema.org markup",
															},
														},
														{
															name: "emergencyService",
															type: "relationship",
															relationTo: "services",
															hasMany: false,
															label: "Emergency Service",
															admin: {
																width: "50%",
																description:
																	"Service designated as the 24/7 emergency offering",
															},
														},
													],
												},
												{
													name: "serviceAreas",
													type: "array",
													fields: [
														{
															name: "name",
															type: "text",
															required: true,
														},
														{
															name: "type",
															type: "select",
															defaultValue: "Suburb",
															options: [
																{ label: "Suburb", value: "Suburb" },
																{ label: "City", value: "City" },
																{ label: "Region", value: "Region" },
															],
															required: true,
														},
													],
												},
											],
										},
										{
											label: "Reviews & Integrations",
											fields: [
												{
													name: "reviews",
													type: "group",
													label: "Reviews Configuration",
													admin: {
														description:
															"Choose how reviews are sourced and displayed on the website. Select 'Google Places API' to automatically fetch reviews or 'Manual Input' to manually enter rating data and select highlighted reviews.",
													},
													fields: [
														{
															name: "source",
															type: "select",
															defaultValue: "hardcoded",
															options: [
																{
																	label: "Manual Input",
																	value: "hardcoded",
																},
																{
																	label: "Google Places API",
																	value: "google-api",
																},
															],
															required: true,
														},
														{
															type: "row",
															admin: {
																condition: (_, siblingData) =>
																	siblingData?.source === "hardcoded",
															},
															fields: [
																{
																	name: "ratingValue",
																	type: "number",
																	required: true,
																	defaultValue: 5,
																	min: 0,
																	max: 5,
																	admin: { width: "25%" },
																},
																{
																	name: "reviewCount",
																	type: "number",
																	required: true,
																	defaultValue: 0,
																	min: 0,
																	admin: { width: "25%" },
																},
																{
																	name: "bestRating",
																	type: "number",
																	defaultValue: 5,
																	admin: { width: "25%" },
																},
																{
																	name: "worstRating",
																	type: "number",
																	defaultValue: 1,
																	admin: { width: "25%" },
																},
															],
														},
														{
															name: "highlightedReviews",
															type: "relationship",
															relationTo: ["reviews"],
															hasMany: true,
															label: "Highlighted Reviews (Collection)",
															admin: {
																condition: (_, siblingData) =>
																	siblingData?.source === "hardcoded",
																description:
																	"Select reviews from the Reviews collection to highlight on the website.",
															},
														},

														{
															type: "row",
															admin: {
																condition: (_, siblingData) =>
																	siblingData?.source === "google-api",
															},
															fields: [
																{
																	name: "mapsUrl",
																	type: "text",
																	label: "Google Maps URL",
																	admin: { width: "50%" },
																},
																{
																	name: "placeId",
																	type: "text",
																	label: "Google Place ID",
																	admin: { width: "50%" },
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
};
