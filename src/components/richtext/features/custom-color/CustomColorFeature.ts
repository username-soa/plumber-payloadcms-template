import { createServerFeature } from "@payloadcms/richtext-lexical";

export const CustomColorFeature = createServerFeature({
	feature: {
		ClientFeature:
			"@/components/richtext/features/custom-color/CustomColorFeatureClient#CustomColorFeatureClient",
	},
	key: "custom-color",
});

console.log("CustomColorFeature loaded/initialized");
