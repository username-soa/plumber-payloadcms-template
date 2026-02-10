import * as LucideIcons from "lucide-react";
import type React from "react";

// Helper to convert kebab-case to PascalCase for icon lookup
const kebabToPascal = (str: string) =>
	str
		?.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");

const getLucideIcon = (name: string) => {
	if (!name) return null;
	const pascalName = kebabToPascal(name);
	const Icon = (
		LucideIcons as unknown as Record<
			string,
			React.ComponentType<LucideIcons.LucideProps>
		>
	)[pascalName];
	return Icon || null;
};

type Props = {
	features: {
		id?: string;
		icon?: string;
		text: string;
	}[];
};

export const FeatureListBlock: React.FC<Props> = ({ features }) => {
	if (!features || features.length === 0) return null;

	return (
		<ul className="flex flex-wrap gap-x-8 gap-y-4 my-6 list-none p-0">
			{features.map((feature, index) => {
				const IconComponent = getLucideIcon(feature.icon || "check");
				return (
					<li key={feature.id || index} className="flex items-center gap-3">
						<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
							{IconComponent && <IconComponent size={16} strokeWidth={2.5} />}
						</div>
						<span className="text-sm font-medium text-foreground">
							{feature.text}
						</span>
					</li>
				);
			})}
		</ul>
	);
};
