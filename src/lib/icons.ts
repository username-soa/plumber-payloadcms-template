import type React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Converts a kebab-case string to PascalCase.
 * Used to map kebab-case icon names (from CMS) to Lucide component names.
 * @example "arrow-right" → "ArrowRight"
 */
export const kebabToPascal = (str: string): string =>
	str
		?.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");

/**
 * Returns a Lucide icon component by its kebab-case or PascalCase name.
 * Returns `null` if the icon name is empty or not found.
 */
export const getLucideIcon = (
	name: string,
): React.ComponentType<LucideIcons.LucideProps> | null => {
	if (!name) return null;
	const pascalName = kebabToPascal(name);
	const Icon = (
		LucideIcons as unknown as Record<
			string,
			React.ComponentType<LucideIcons.LucideProps>
		>
	)[pascalName];
	return Icon ?? null;
};
