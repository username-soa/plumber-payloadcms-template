"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { ServiceCard } from "@/components/cards/service-card";
import { Button } from "@/components/ui/button";
import { HighlightedTitle } from "@/components/ui/highlighted-title";

import { CMSLink } from "@/components/payload/CMSLink";
import type { CMSLinkType } from "@/lib/cms-link";
import type { Page, Service } from "@/payload-types";

// Helper Components
import { ServiceHero } from "./highlighted-services/service-hero";
import { ServiceCarousel } from "./highlighted-services/service-carousel";

type HighlightedServicesBlockProps = Extract<
	NonNullable<Page["layout"]>[number],
	{ blockType: "highlightedServices" }
> & { cta?: CMSLinkType };

export const HighlightedServicesBlockComponent = (
	props: HighlightedServicesBlockProps,
) => {
	const {
		tag,
		title,
		highlightedText,
		description,
		selectedServices,
		emergencyService,
		layout = "grid",
		cta,
		linkToAllServices = true,
		paddingTopOption = "default",
		paddingBottomOption = "default",
		background,
	} = props;

	// 1. Resolve Emergency Service
	const resolvedEmergencyService = useMemo(() => {
		return (
			typeof emergencyService === "object" && emergencyService !== null
				? emergencyService
				: null
		) as Service | null;
	}, [emergencyService]);

	// 2. Filter invalid services and construct final list
	const services = useMemo(() => {
		const validSelectedServices = selectedServices.filter(
			(s): s is Service => typeof s === "object" && s !== null,
		);

		let allServices = resolvedEmergencyService
			? [resolvedEmergencyService, ...validSelectedServices]
			: validSelectedServices;

		// Remove duplicates
		allServices = allServices.filter(
			(service, index, self) =>
				index === self.findIndex((t) => t.id === service.id),
		);

		return allServices;
	}, [selectedServices, resolvedEmergencyService]);

	if (!services.length) return null;

	return (
		<SectionWrapper
			paddingTop={paddingTopOption}
			paddingBottom={paddingBottomOption}
			background={background}
		>
			<div className="container mx-auto">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
					<div className="max-w-2xl">
						{tag && (
							<span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-foreground bg-muted rounded-md">
								{tag}
							</span>
						)}
						<TypographyH2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 border-none">
							<HighlightedTitle title={title} highlight={highlightedText} />
						</TypographyH2>
						{description && (
							<TypographyP className="text-muted-foreground text-lg mt-0">
								{description}
							</TypographyP>
						)}
					</div>
					<div className="self-start md:self-auto">
						{cta ? (
							<CMSLink link={cta} />
						) : (
							linkToAllServices && (
								<Button variant="outline" asChild>
									<Link href="/services" className="flex items-center gap-2">
										View All Services
										<ArrowRight className="w-4 h-4" />
									</Link>
								</Button>
							)
						)}
					</div>
				</div>

				{/* Layouts */}
				{layout === "grid" && resolvedEmergencyService && (
					<div className="flex flex-col gap-px bg-border">
						{/* First Row: Split 50/50 */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
							{/* Emergency Service - Left Half */}
							<ServiceHero service={services[0]} />

							{/* Right Half: 2 Other Services */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-px">
								{services.slice(1, 3).map((service) => (
									<ServiceCard key={service.id} service={service} />
								))}
							</div>
						</div>

						{/* Remaining Services: Grid of 3 */}
						{services.length > 3 && (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:lg:col-span-1">
								{services.slice(3).map((service) => (
									<ServiceCard key={service.id} service={service} />
								))}
							</div>
						)}
					</div>
				)}

				{layout === "grid" && !resolvedEmergencyService && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
						{services.map((service) => (
							<div key={service.id} className="h-full">
								<ServiceCard service={service} />
							</div>
						))}
					</div>
				)}

				{layout === "carousel" && (
					<ServiceCarousel
						services={services}
						emergencyServiceId={resolvedEmergencyService?.id}
					/>
				)}
			</div>
		</SectionWrapper>
	);
};
