import type { Field, GroupField } from "payload";

export const badge = ({
	name = "badge",
	label = "Badge",
	overrides = {},
}: {
	name?: string;
	label?: string;
	overrides?: Partial<GroupField>;
} = {}): Field => {
	const badgeResult: Field = {
		name,
		label,
		type: "group",
		admin: {
			...overrides?.admin,
		},
		fields: [
			{
				name: "content",
				type: "text",
				required: true,
			},
			{
				name: "variant",
				type: "select",
				defaultValue: "default",
				options: [
					{ label: "Default", value: "default" },
					{ label: "Secondary", value: "secondary" },
					{ label: "Destructive", value: "destructive" },
					{ label: "Outline", value: "outline" },
				],
			},
			{
				name: "size",
				type: "select",
				defaultValue: "default",
				options: [
					{ label: "Small", value: "sm" },
					{ label: "Default", value: "default" },
					{ label: "Large", value: "lg" },
				],
			},
			{
				name: "icon",
				type: "text",
				label: "Icon",
				admin: {
					components: {
						Field: "@/components/payload/IconPicker#IconPicker",
					},
				},
			},
		],
		...overrides,
	};

	return badgeResult;
};
