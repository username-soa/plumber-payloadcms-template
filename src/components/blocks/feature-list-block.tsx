import { CheckCircle2 } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { getLucideIcon } from "@/lib/icons";

type Props = {
	layout?: "default" | "pills";
	features: {
		id?: string;
		icon?: string;
		text: string;
	}[];
};

export const FeatureListBlock: React.FC<Props> = ({
	features,
	layout = "default",
}) => {
	if (!features || features.length === 0) return null;
	if (layout === "pills") {
		return (
			<div className="flex flex-wrap gap-3 my-4">
				{features.map((feature, index) => {
					return (
						<Badge
							key={feature.id || index}
							variant="outline"
							className="gap-1.5"
						>
							<CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
							{feature.text}
						</Badge>
					);
				})}
			</div>
		);
	}

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
