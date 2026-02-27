import { format } from "date-fns";
import { FileText, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

interface LegalHeroProps {
	badge?: string | null;
	title?: string | null;
	subtitle?: string | null;
	icon?: string | null;
	showLastUpdated?: boolean | null;
	lastUpdated?: string;
	updatedAt: string;
	pageTitle: string;
}

export function LegalHero({
	badge,
	title,
	subtitle,
	icon,
	showLastUpdated,
	lastUpdated,
	updatedAt,
	pageTitle,
}: LegalHeroProps) {
	const displayDate = lastUpdated
		? format(new Date(lastUpdated), "MMMM d, yyyy")
		: format(new Date(updatedAt), "MMMM d, yyyy");

	const Icon = icon === "file" ? FileText : Shield;

	return (
		<section className="bg-muted/50 border-b">
			<div className="container mx-auto px-4 py-16 md:py-24">
				<div className="max-w-3xl mx-auto text-center mt-14">
					{badge && (
						<Badge variant="outline" className="mb-4 gap-2">
							<Icon className="w-4 h-4" />
							{badge}
						</Badge>
					)}
					<TypographyH1 className="text-4xl md:text-5xl font-bold mb-4">
						{title || pageTitle}
					</TypographyH1>
					{subtitle && (
						<TypographyP className="text-lg text-muted-foreground mt-0">
							{subtitle}
						</TypographyP>
					)}
					{showLastUpdated !== false && (
						<TypographyP className="text-sm text-muted-foreground mt-4">
							Last updated: {displayDate}
						</TypographyP>
					)}
				</div>
			</div>
		</section>
	);
}
