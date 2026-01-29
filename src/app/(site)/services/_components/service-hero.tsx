import { LucideIcon } from "lucide-react";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "./breadcrumbs";

interface ServiceHeroProps {
	title: string;
	description: string;
	icon: LucideIcon;
	breadcrumbItems?: { label: string; href?: string }[];
}

export function ServiceHero({
	title,
	description,
	icon: Icon,
	breadcrumbItems,
}: ServiceHeroProps) {
	return (
		<section className="relative w-full md:min-h-[70vh] min-h-[60vh] py-20 md:py-28 bg-muted/30 overflow-hidden border-b border-border/50 flex items-center">
			<div className="container mx-auto px-6 relative z-10">
				{breadcrumbItems && (
					<div className="mb-8">
						<Breadcrumbs items={breadcrumbItems} variant="minimal" />
					</div>
				)}

				<div className="flex flex-col md:flex-row items-center gap-10">
					<div className="flex-1 max-w-2xl">
						<Badge
							variant="outline"
							className="mb-6 px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5"
						>
							Professional Plumbing Services
						</Badge>
						<TypographyH1 className="mb-6">{title}</TypographyH1>
						<TypographyLead className="text-muted-foreground text-xl">
							{description}
						</TypographyLead>
					</div>

					<div className="hidden md:flex flex-1 justify-center">
						<div className="relative w-64 h-64 bg-background rounded-3xl shadow-2xl border border-border/50 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
							<div className="absolute inset-0 bg-primary/5 rounded-3xl" />
							<Icon className="w-32 h-32 text-primary" strokeWidth={1.5} />
						</div>
					</div>
				</div>
			</div>

			{/* Simple Background Decoration */}
			<div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background to-transparent opacity-50" />
			<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
		</section>
	);
}
