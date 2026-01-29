import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { SITE_CONFIG } from "@/lib/site-config";

export function ServicesGrid() {
	return (
		<section className="py-24 w-full">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<TypographyH2 className="mb-4 md:text-5xl text-4xl border-none">
						Our Premium Plumbing Services
					</TypographyH2>
					<TypographyMuted className="text-base">
						We offer a comprehensive range of plumbing solutions backed by our
						commitment to quality and customer satisfaction.
					</TypographyMuted>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
					{SITE_CONFIG.services.map((service) => {
						// Dynamic Icon Component
						// @ts-ignore - We know the icon name exists in lucide-react from our config
						const IconComponent =
							(Icons[service.icon as keyof typeof Icons] as LucideIcon) ||
							Icons.Wrench;

						return (
							<Link
								key={service.slug}
								href={`/services/${service.slug}`}
								className="group flex flex-col h-full p-8 transition-all duration-300 hover:bg-muted/50 bg-background"
							>
								<div className="mb-3">
									<div className="md:size-10 size-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 bg-background">
										<IconComponent className="md:size-5 size-4" />
									</div>
								</div>

								<TypographyH2 className="text-2xl font-semibold mb-2 text-foreground border-none">
									{service.title}
								</TypographyH2>

								<TypographyMuted className="text-base line-clamp-3">
									{service.description}
								</TypographyMuted>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
