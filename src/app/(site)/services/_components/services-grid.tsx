import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import type { Service } from "@/payload-types";
import DynamicIcon from "@/components/ui/dynamic-icon";
import Link from "next/link";

interface ServicesGridProps {
	services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&>a]:border-b md:[&>a]:border-r md:[&>a:nth-child(2n)]:border-r-0 lg:[&>a:nth-child(2n)]:border-r lg:[&>a:nth-child(3n)]:border-r-0!">
					{services.map((service) => {
						// Dynamic Icon Component
						return (
							<Link
								key={service.slug}
								href={`/services/${service.slug}`}
								className="group flex flex-col h-full p-8 transition-all duration-300 hover:bg-muted/50 bg-background"
							>
								<div className="mb-3">
									<div className="md:size-10 size-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 bg-background">
										<DynamicIcon
											name={service.icon as string}
											className="md:size-5 size-4"
										/>
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
