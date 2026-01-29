import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

interface RelatedServicesProps {
	currentSlug: string;
}

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
	// filter out current service and take up to 3 others
	const otherServices = SITE_CONFIG.services
		.filter((s) => s.slug !== currentSlug)
		.slice(0, 3);

	if (otherServices.length === 0) return null;

	return (
		<section className="py-16 md:py-24 bg-muted/20">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
					<div>
						<TypographyH3 className="md:text-5xl text-4xl text-center font-bold mb-4">
							Explore Other Services
						</TypographyH3>
						<TypographyMuted className="text-base max-md:text-center">
							Comprehensive plumbing solutions for every need.
						</TypographyMuted>
					</div>
					<Button
						asChild
						variant={"outline"}
						className="group flex items-center font-semibold text-primary hover:text-primary/80 transition-colors mb-0.5 max-md:w-full rounded-full border-primary/10"
					>
						<Link href="/services">
							View All Services
							<ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{otherServices.map((service) => {
						// @ts-ignore - We know the icon name exists in lucide-react from our config
						const Icon =
							(Icons[service.icon as keyof typeof Icons] as LucideIcon) ||
							Icons.Wrench;

						return (
							<Link
								key={service.slug}
								href={`/services/${service.slug}`}
								className="group p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col items-start"
							>
								<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
									<Icon className="w-5 h-5" />
								</div>

								<h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
									{service.title}
								</h4>

								<p className="text-muted-foreground text-sm line-clamp-2">
									{service.description}
								</p>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
