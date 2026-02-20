"use client";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { Service } from "@/payload-types";
import { ServiceHero } from "@/app/(site)/services/_components/service-hero";
import Link from "next/link";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { SectionWrapper } from "@/components/ui/section-wrapper";

interface ServiceHeroLivePreviewProps {
	initialData: Service;
	subServices: {
		title: string;
		description: string;
		icon: string;
		slug: string;
	}[];
	breadcrumbItems?: { label: string; href?: string }[];
}

export function ServiceLivePreview({
	initialData,
	subServices,
	breadcrumbItems,
}: ServiceHeroLivePreviewProps) {
	const { data } = useLivePreview<Service>({
		initialData,
		serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
		depth: 3,
	});

	return (
		<>
			<ServiceHero
				title={data.title}
				description={data.description}
				icon={data.icon}
				isEmergency={data.isEmergency || false}
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Sub-services Grid - Always useful for navigation */}
			{subServices && subServices.length > 0 && (
				<SectionWrapper>
					<div className="space-y-6">
						<div>
							<span className="text-primary font-semibold text-sm uppercase tracking-wider">
								What's Included
							</span>
							<h3 className="text-2xl font-bold mt-2">
								Our {data.title} Services
							</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{subServices.map((subService) => {
								return (
									<Link
										key={subService.title}
										href={`/services/${subService.slug}`}
										className="group flex flex-col h-full p-8 rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50"
									>
										<div className="mb-3">
											<div className="md:size-10 size-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 bg-background">
												<DynamicIcon
													name={subService.icon}
													className="md:size-5 size-4"
												/>
											</div>
										</div>

										<TypographyH2 className="text-xl font-semibold mb-2 text-foreground border-none">
											{subService.title}
										</TypographyH2>
										<TypographyMuted className="text-base line-clamp-3">
											{subService.description}
										</TypographyMuted>
									</Link>
								);
							})}
						</div>
					</div>
				</SectionWrapper>
			)}
		</>
	);
}
