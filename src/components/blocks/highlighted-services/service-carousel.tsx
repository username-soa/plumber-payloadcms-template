"use client";

import { useState, useEffect } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { ModernServiceCard } from "@/components/cards/modern-service-card";
import { cn } from "@/lib/utils";
import type { Service } from "@/payload-types";

interface ServiceCarouselProps {
	services: Service[];
	emergencyServiceId?: number;
}

export function ServiceCarousel({
	services,
	emergencyServiceId,
}: ServiceCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	useEffect(() => {
		if (!api) {
			return;
		}

		setScrollSnaps(api.scrollSnapList());
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
		api.on("reInit", () => {
			setScrollSnaps(api.scrollSnapList());
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<Carousel
			setApi={setApi}
			opts={{
				align: "start",
				loop: true,
			}}
			className="w-full"
		>
			<CarouselContent className="-ml-4">
				{services.map((service) => (
					<CarouselItem
						key={service.id}
						className="pl-4 md:basis-1/2 lg:basis-1/3 h-full"
					>
						<div className="h-full">
							<ModernServiceCard
								service={service}
								isEmergency={emergencyServiceId === service.id}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>

			{/* Carousel Dots */}
			<div className="flex justify-center gap-2 mt-8">
				{scrollSnaps.map((snap, index) => (
					<button
						key={snap}
						type="button"
						className={cn(
							"h-2 w-2 rounded-full transition-all duration-300",
							index + 1 === current
								? "bg-primary w-6"
								: "bg-primary/20 hover:bg-primary/40",
						)}
						onClick={() => api?.scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</Carousel>
	);
}
