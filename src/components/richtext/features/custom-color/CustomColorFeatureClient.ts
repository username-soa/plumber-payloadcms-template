"use client";
import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { CustomColorPicker } from "./CustomColorPicker";
import { CustomColorPlugin } from "./CustomColorPlugin";

export const CustomColorFeatureClient = createClientFeature({
	plugins: [
		{
			Component: CustomColorPlugin,
			position: "normal", // Rendered as a normal plugin in the editor
		},
	],
	toolbarFixed: {
		groups: [
			{
				key: "custom-color",
				type: "buttons",
				order: 10,
				items: [
					{
						key: "custom-color-picker",
						Component: CustomColorPicker,
					},
				],
			},
		],
	},
	toolbarInline: {
		groups: [
			{
				key: "custom-color-inline",
				type: "buttons",
				order: 10,
				items: [
					{
						key: "custom-color-picker-inline",
						Component: CustomColorPicker,
					},
				],
			},
		],
	},
});
