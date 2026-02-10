export const RICH_TEXT_COLORS = {
	"blue-primary": {
		label: "Primary Blue",
		css: { color: "#2563eb" },
	},
	"orange-industrial": {
		label: "Industrial Orange",
		css: { color: "#ea580c" },
	},
	"copper-primary": {
		label: "Copper",
		css: { color: "#c2410c" },
	},
	"teal-ocean": {
		label: "Ocean Teal",
		css: { color: "#0d9488" },
	},
	"navy-professional": {
		label: "Professional Navy",
		css: { color: "#1e3a5f" },
	},
	white: {
		label: "White",
		css: { color: "#ffffff" },
	},
	black: {
		label: "Black",
		css: { color: "#000000" },
	},
} as const;

export type RichTextColor = keyof typeof RICH_TEXT_COLORS;
