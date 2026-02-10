import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "@/payload-types";

interface ServiceHeroProps {
	service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
	// Resolve image safely
	const heroImage =
		typeof service.image === "object" && service.image !== null
			? service.image
			: null;

	const hasImage = !!heroImage?.url;

	return (
		<div className="relative h-full min-h-[400px] group overflow-clip">
			{/* Background Image using next/image */}
			{hasImage && heroImage.url && (
				<div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
					<Image
						src={heroImage.url}
						alt={heroImage.alt || service.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 50vw"
						priority // LCP optimization for hero image
					/>
				</div>
			)}

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black/60" />

			{/* Content */}
			<div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12 text-white">
				<div className="mb-4">
					<Badge
						variant="destructive"
						className="uppercase bg-red-600 hover:bg-red-700 text-white border-none px-3 py-1"
					>
						<span className="mr-2">♦</span> 24/7 Emergency
					</Badge>
				</div>
				<h3 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h3>
				<p className="text-gray-200 mb-8 max-w-md text-lg leading-relaxed">
					{service.description}
				</p>
				<Button
					asChild
					size="lg"
					variant="outline"
					className="w-fit rounded-full bg-transparent hover:bg-white hover:text-black border-white text-white transition-colors"
				>
					<Link href={`/services/${service.slug}`}>
						See more <ArrowRight className="ml-2 w-4 h-4" />
					</Link>
				</Button>
			</div>
		</div>
	);
}
