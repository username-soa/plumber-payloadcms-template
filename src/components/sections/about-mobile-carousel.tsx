"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const CARDS = [
	{
		title: "Built on Trust, Powered by Service",
		image: "/images/about/about-trust.png",
	},
	{
		title: "Making Efficient Flow Our Promise",
		image: "/images/about/about-team.png",
	},
	{
		title: "Your Trusted Plumbing Experts",
		image: "/images/about/about-expert.png",
	},
];

function AboutCard({
	title,
	image,
	className,
}: {
	title: string;
	image: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"group relative w-full float-left rounded-3xl overflow-hidden cursor-pointer md:h-[400px] max-md:aspect-2/3",
				className,
			)}
		>
			<Image
				src={image}
				alt={title}
				fill
				sizes="100vw"
				className="object-cover transition-transform duration-700 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

			<div className="absolute bottom-0 left-0 md:p-6 p-4 w-full">
				<h3 className="text-white text-xl font-bold leading-snug max-w-[80%] group-hover:translate-x-2 transition-transform">
					{title}
				</h3>
			</div>
		</div>
	);
}

export default function AboutMobileCarousel() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<div className="md:hidden">
			<Carousel
				setApi={setApi}
				plugins={[
					Autoplay({
						delay: 3000,
					}),
				]}
				className="w-full"
			>
				<CarouselContent>
					{CARDS.map((card) => (
						<CarouselItem key={card.title}>
							<AboutCard {...card} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<div className="flex justify-center gap-2 mt-4">
				{Array.from({ length: count }).map((_, index) => (
					<button
						key={CARDS[index]?.title ?? `slide-${index}`}
						type="button"
						className={cn(
							"h-2 rounded-full transition-all duration-300",
							current === index ? "w-8 bg-primary" : "w-2 bg-primary/30",
						)}
						onClick={() => api?.scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
