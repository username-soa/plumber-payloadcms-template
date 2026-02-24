import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { Breadcrumbs } from "./breadcrumbs";

interface ServiceHeroProps {
	title: string;
	description: string;
	icon: string;
	isEmergency?: boolean;
	breadcrumbItems?: { label: string; href?: string }[];
}

export function ServiceHero({
	title,
	description,
	icon,
	isEmergency,
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
						<div className="flex flex-wrap items-center gap-3 mb-6">
							<Badge
								variant="outline"
								className="px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5"
							>
								Professional Plumbing Services
							</Badge>
							{isEmergency && (
								<>
									<Badge
										variant="outline"
										className="px-4 py-1 text-sm text-red-900 border-red-600/20 bg-red-500/20"
									>
										Emergency Service
									</Badge>
									<Badge
										variant="outline"
										className="px-4 py-1 text-sm text-green-900 border-green-600/20 bg-green-500/20"
									>
										Available: 24/7
									</Badge>
								</>
							)}
						</div>
						<TypographyH1 className="mb-6">{title}</TypographyH1>
						<TypographyLead className="text-muted-foreground text-xl">
							{description}
						</TypographyLead>
					</div>

					<div className="hidden md:flex flex-1 justify-center">
						<div className="relative w-64 h-64 bg-background rounded-3xl shadow-2xl border border-border/50 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
							<div className="absolute inset-0 bg-primary/5 rounded-3xl" />
							<DynamicIcon name={icon} className="w-32 h-32 text-primary" />
						</div>
					</div>
				</div>
			</div>

			{/* Simple Background Decoration */}
			<div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-background to-transparent opacity-50" />
			<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
		</section>
	);
}
