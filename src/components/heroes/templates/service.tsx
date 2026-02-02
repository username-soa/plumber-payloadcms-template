import type { Page } from "@/payload-types";
import { Badge } from "@/components/ui/badge";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { Breadcrumbs } from "@/app/(site)/services/_components/breadcrumbs";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";

type HeroProps = {
	hero: NonNullable<Page["hero"]>;
	pageTitle?: string;
};

export const ServiceHero = ({ hero, pageTitle }: HeroProps) => {
	const {
		title,
		description,
		icon,
		breadcrumbs: showBreadcrumbs,
		badge,
	} = hero;

	const displayTitle = title || pageTitle;

	// Simple breadcrumb fallback
	const breadcrumbItems = [{ label: displayTitle || "Page" }];

	return (
		<section className="relative w-full md:min-h-[70vh] min-h-[60vh] py-20 md:py-28 bg-muted/30 overflow-hidden border-b border-border/50 flex items-center">
			<div className="container mx-auto px-6 relative z-10">
				{showBreadcrumbs && (
					<div className="mb-8">
						<Breadcrumbs items={breadcrumbItems} variant="minimal" />
					</div>
				)}

				<div className="flex flex-col md:flex-row items-center gap-10">
					<div className="flex-1 max-w-2xl">
						<div className="flex flex-wrap items-center gap-3 mb-6">
							{badge && (
								<Badge
									variant="outline"
									className="px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5"
								>
									{badge}
								</Badge>
							)}
						</div>

						<div className="hero-content">
							{displayTitle && (
								<TypographyH1 className="mb-6 text-4xl md:text-5xl font-bold">
									{displayTitle}
								</TypographyH1>
							)}
							{description && (
								<TypographyLead className="text-muted-foreground text-xl">
									{description}
								</TypographyLead>
							)}
						</div>
					</div>

					{icon && (
						<div className="hidden md:flex flex-1 justify-center">
							<div className="relative w-64 h-64 bg-background rounded-3xl shadow-2xl border border-border/50 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
								<div className="absolute inset-0 bg-primary/5 rounded-3xl" />
								<DynamicIcon name={icon} className="w-32 h-32 text-primary" />
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Simple Background Decoration */}
			<div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-background to-transparent opacity-50" />
			<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
		</section>
	);
};
