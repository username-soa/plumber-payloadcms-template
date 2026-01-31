"use client";
import dynamic from "next/dynamic";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface DynamicIconProps extends LucideProps {
	name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
	// The CMS now returns kebab-case
	// We treat the name as potentially direct key, but to be safe we can force lowercase
	// or just assume validity.
	let iconKey = name as keyof typeof dynamicIconImports;

	// Fallback: If icon not found, try stripping "-icon" suffix
	// This handles cases where data might have been saved as "search-icon" but the key is "search"
	if (!dynamicIconImports[iconKey] && name.endsWith("-icon")) {
		const strippedName = name.replace(/-icon$/, "");
		if (dynamicIconImports[strippedName as keyof typeof dynamicIconImports]) {
			iconKey = strippedName as keyof typeof dynamicIconImports;
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

	const LucideIcon = dynamic(
		dynamicIconImports[iconKey] || dynamicIconImports["wrench"],
	);

	return <LucideIcon {...props} />;
};

export default DynamicIcon;
