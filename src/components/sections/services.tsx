import Link from "next/link";
import {
	ArrowRight,
	Search,
	Flame,
	Droplets,
	Wrench,
	Siren,
	Bath,
	Route,
	Building2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
	Search,
	Flame,
	Droplets,
	Wrench,
	Siren,
	Bath,
	Route,
	Building2,
};

const MAX_SERVICES = 6;

// Bento grid layout: indices 0 and 3 are featured (span 2 cols)
const BENTO_CONFIG = {
	featured: [0, 3],
};

export function ServicesSection() {
	const featuredServices = SITE_CONFIG.services.slice(0, MAX_SERVICES);

	return (
		<section className="w-full py-24 bg-muted/20">
			<div className="container mx-auto px-6 md:px-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
					<div className="max-w-2xl">
						<span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-foreground bg-muted rounded-md">
							What We Offer
						</span>
						<TypographyH2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 border-none">
							Our Professional Services
						</TypographyH2>
						<TypographyP className="text-muted-foreground text-lg mt-0">
							From routine maintenance to emergency repairs, we handle all your
							plumbing needs with precision and care.
						</TypographyP>
					</div>
					<Button variant="outline" className="self-start md:self-auto" asChild>
						<Link href="/services" className="flex items-center gap-2">
							View All Services
							<ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
					{featuredServices.map((service, index) => {
						const Icon = ICON_MAP[service.icon] || Wrench;
						const isFeatured = BENTO_CONFIG.featured.includes(index);

						return (
							<Link
								key={service.slug}
								href={`/services/${service.slug}`}
								className={cn(
									"group block h-full",
									isFeatured && "md:col-span-2",
								)}
							>
								<Card
									className={cn(
										"h-full border-border/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20 overflow-hidden",
										isFeatured
											? "bg-primary text-primary-foreground"
											: "bg-card hover:bg-accent/50",
									)}
								>
									<CardHeader className="pb-2">
										<div className="flex items-center justify-between">
											<div
												className={cn(
													"w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
													isFeatured
														? "bg-primary-foreground/20"
														: "bg-primary/10",
												)}
											>
												<Icon
													className={cn(
														"w-6 h-6",
														isFeatured
															? "text-primary-foreground"
															: "text-primary",
													)}
												/>
											</div>
											<ArrowRight
												className={cn(
													"w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300",
													isFeatured
														? "text-primary-foreground"
														: "text-primary",
												)}
											/>
										</div>
									</CardHeader>
									<CardContent className="flex flex-col justify-between flex-1">
										<div>
											<CardTitle
												className={cn(
													"text-xl mb-2 transition-colors",
													isFeatured
														? "text-primary-foreground"
														: "group-hover:text-primary",
												)}
											>
												{service.title}
											</CardTitle>
											<CardDescription
												className={cn(
													isFeatured
														? "text-primary-foreground line-clamp-3"
														: "text-muted-foreground line-clamp-2",
												)}
											>
												{isFeatured
													? service.longDescription
													: service.description}
											</CardDescription>
										</div>
										<div
											className={cn(
												"flex items-center gap-1 text-sm font-medium mt-4",
												isFeatured ? "text-primary-foreground" : "text-primary",
											)}
										>
											<span>Learn more</span>
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
