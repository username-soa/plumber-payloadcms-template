import type { Field } from "payload";
import { badge } from "./badge";
import { link } from "./link";

export const hero: Field = {
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
				{ label: "Services Hero", value: "servicesHero" },
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
					["default", "highImpact", "minimal", "servicesHero"].includes(type),
			},
		},
		{
			name: "titleHighlight",
			type: "text",
			label: "Title Highlight",
			admin: {
				description: "Text to highlight in primary color (case-insensitive)",
				condition: (_, { type } = {}) =>
					["highImpact", "minimal"].includes(type),
			},
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				condition: (_, { type } = {}) =>
					["default", "highImpact", "minimal", "servicesHero"].includes(type),
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
		badge({
			overrides: {
				admin: {
					condition: (_, { type } = {}) =>
						["default", "minimal"].includes(type),
				},
			},
		}),
		// Media
		{
			name: "bgImage",
			type: "upload",
			relationTo: "media",
			label: "Background Image",
			required: true,
			admin: {
				condition: (_, { type } = {}) =>
					["default", "highImpact", "servicesHero"].includes(type),
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
			admin: {
				condition: (_, { type } = {}) =>
					["default", "highImpact", "servicesHero"].includes(type),
			},
			fields: [link()],
		},
		{
			name: "trustIndicators",
			type: "array",
			label: "Trust Indicators",
			minRows: 1,
			maxRows: 4,
			admin: {
				condition: (_, { type } = {}) => type === "servicesHero",
				description: "Add up to 4 trust indicators (icons with text)",
			},
			fields: [
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
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
					required: true,
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
	],
};
