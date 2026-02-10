import type { Field, GroupField } from "payload";

export const link = ({
	name = "link",
	label = "Link",
	overrides = {},
}: {
	name?: string;
	label?: string;
	overrides?: Partial<GroupField>;
} = {}): Field => {
	const linkResult: Field = {
		name,
		label,
		type: "group",
		admin: {
			...overrides?.admin,
		},
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
					condition: (_, siblingData) => siblingData?.type === "custom",
				},
			},
			{
				name: "newTab",
				type: "checkbox",
				label: "Open in new tab",
				admin: {
					condition: (_, siblingData) => siblingData?.type === "custom",
				},
			},
			{
				name: "email",
				type: "text",
				label: "Email Address",
				required: true,
				admin: {
					condition: (_, siblingData) => siblingData?.type === "email",
				},
			},
			{
				name: "phoneNumber",
				type: "text",
				label: "Phone Number",
				required: true,
				admin: {
					condition: (_, siblingData) => siblingData?.type === "phone",
				},
			},
			{
				name: "reference",
				type: "relationship",
				relationTo: ["pages", "services"],
				admin: {
					condition: (_, siblingData) => siblingData?.type === "reference",
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
					{ label: "Badge (Pulsing)", value: "badge-pulsing" },
					{ label: "Primary Gradient Dots", value: "primary-gradient-dots" },
				],
			},
		],
		...overrides,
	};

	return linkResult;
};
