"use client";
import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { CustomColorPicker } from "./CustomColorPicker";

console.log("Loading CustomColorFeatureClient...");

export const CustomColorFeatureClient = createClientFeature({
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
