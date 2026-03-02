"use client";

import React, { useEffect, useState } from "react";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface DynamicIconProps extends LucideProps {
	name: string;
}

// Global cache to avoid fetching the exact same icon module for different instances
const iconCache = new Map<string, React.FC<LucideProps>>();

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
	const [LucideIcon, setLucideIcon] = useState<React.FC<LucideProps> | null>(
		null,
	);

	// The CMS now returns kebab-case
	// We treat the name as potentially direct key, but to be safe we can force lowercase
	// or just assume validity.
	let iconKey = name as keyof typeof dynamicIconImports;

	// Helper to convert PascalCase to kebab-case
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

	useEffect(() => {
		let isMounted = true;

		const loadIcon = async () => {
			const finalKey = dynamicIconImports[iconKey] ? iconKey : "wrench";

			if (iconCache.has(finalKey)) {
				setLucideIcon(() => iconCache.get(finalKey)!);
				return;
			}

			try {
				const module =
					await dynamicIconImports[
						finalKey as keyof typeof dynamicIconImports
					]();
				const IconComponent = module.default;
				iconCache.set(finalKey, IconComponent);
				if (isMounted) {
					setLucideIcon(() => IconComponent);
				}
			} catch (err) {
				console.error(`DynamicIcon: Failed to load icon "${finalKey}"`, err);
			}
		};

		loadIcon();

		return () => {
			isMounted = false;
		};
	}, [iconKey]);

	// Render a stable, size-matching placeholder during SSR and initial hydration
	if (!LucideIcon) {
		const { size = 24, className = "" } = props;
		const width = typeof size === "number" ? `${size}px` : size;
		const height = typeof size === "number" ? `${size}px` : size;

		return (
			<div
				style={{ width, height }}
				className={`bg-muted/30 animate-pulse rounded-full ${className}`}
			/>
		);
	}

	return <LucideIcon {...props} />;
};

export default DynamicIcon;
