"use client";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DynamicIconProps extends LucideProps {
	name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
	// The CMS now returns kebab-case
	// We treat the name as potentially direct key, but to be safe we can force lowercase
	// or just assume validity.
	let iconKey = name as keyof typeof dynamicIconImports;

	// Helper to convert PascalCase to kebab-case (e.g. ArrowRight -> arrow-right, Signal4g -> signal-4g)
	const toKebabCase = (str: string) =>
		str
			.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
			.replace(/([a-z])([0-9])/g, "$1-$2")
			.toLowerCase();

	if (!dynamicIconImports[iconKey]) {
		// Try converting to kebab-case
		const kebabName = toKebabCase(name);
		if (dynamicIconImports[kebabName as keyof typeof dynamicIconImports]) {
			iconKey = kebabName as keyof typeof dynamicIconImports;
		}

		// Fallback: If icon not found, try stripping "-icon" suffix
		// This handles cases where data might have been saved as "search-icon" but the key is "search"
		if (!dynamicIconImports[iconKey] && name.endsWith("-icon")) {
			const strippedName = name.replace(/-icon$/, "");
			if (dynamicIconImports[strippedName as keyof typeof dynamicIconImports]) {
				iconKey = strippedName as keyof typeof dynamicIconImports;
			}
		}

		// Fallback: If icon not found, try stripping "lucide-" prefix
		if (!dynamicIconImports[iconKey] && name.startsWith("lucide-")) {
			const strippedName = name.replace(/^lucide-/, "");
			if (dynamicIconImports[strippedName as keyof typeof dynamicIconImports]) {
				iconKey = strippedName as keyof typeof dynamicIconImports;
			}
		}
	}

	// Debugging missing icons
	if (typeof window !== "undefined") {
		// Check if the icon exists in the imports
		if (!dynamicIconImports[iconKey]) {
			console.warn(
				`DynamicIcon: Icon "${name}" not found even after trying fallback.`,
			);
		}
	}

	// dynamic() usage needs to be stable or top-level ideally, but for dynamic names it's tricky.
	// Ideally we use a memoized component or similar, but next/dynamic inside render is okay-ish
	// if keys are stable, but actually creating a new component type on every render is bad for React diffing.
	// HOWEVER, the official Lucide Next.js example does exactly this:
	// const LucideIcon = dynamic(dynamicIconImports[name])
	// inside the component.

	const LucideIcon = useMemo(() => {
		return dynamic(dynamicIconImports[iconKey] || dynamicIconImports.wrench);
	}, [iconKey]);

	return <LucideIcon {...props} />;
};

export default DynamicIcon;
