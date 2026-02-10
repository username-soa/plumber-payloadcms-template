import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/payload-types";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ModernServiceCardProps {
	service: Service;
	isEmergency?: boolean;
	className?: string;
}

export function ModernServiceCard({
	service,
	isEmergency,
	className,
}: ModernServiceCardProps) {
	// Resolve image: use service.image if available
	const serviceImage =
		service.image && typeof service.image === "object" ? service.image : null;

	// Determine if we should show image background (if exists)
	// or if we rely on dark background.
	// The user image shows "Water Heater Repair" as dark bg, others as image bg.
	// We will use image if available, else fallback to dark card.
	const hasImage = !!serviceImage;

	return (
		<Link
			href={`/services/${service.slug}`}
			className={cn(
				"group relative flex flex-col h-full min-h-[500px] md:min-h-[550px] w-full overflow-hidden rounded-3xl bg-zinc-900 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20 will-change-transform",
				className,
			)}
		>
			{/* Background Image */}
			{hasImage && serviceImage?.url && (
				<>
					<Image
						src={serviceImage.url}
						alt={serviceImage.alt || service.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
						priority={false}
					/>
					<div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
				</>
			)}

			{/* Dark Background Fallback (if no image) - bg-zinc-900 is already on container */}
			{/* We add a gradient overlay for text readability anyway */}
			<div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-black/80" />

			{/* Emergency Badge */}
			{isEmergency && (
				<div className="absolute top-6 left-6 z-20">
					<Badge
						variant="destructive"
						className="bg-red-600/30 hover:bg-red-700/30 text-white border-none px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg"
					>
						♦ 24/7 Emergency
					</Badge>
				</div>
			)}

			{/* Content Container */}
			<div className="relative z-20 flex flex-1 flex-col justify-end p-8 pointer-events-none">
				{/* Icon Box */}
				{/* Icon Box - Removed backdrop-blur for performance */}
				<div className="mb-4 w-fit rounded-xl bg-white/10 p-3 border border-white/10 transition-transform duration-300 group-hover:-translate-y-2">
					<DynamicIcon
						name={service.icon as string}
						className="h-6 w-6 text-white"
					/>
				</div>

				{/* Text Content */}
				<div className="transform transition-transform duration-300 group-hover:-translate-y-2">
					<h3 className="mb-2 text-2xl font-bold text-white tracking-tight">
						{service.title}
					</h3>
					<p className="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-300">
						{service.description}
					</p>

					{/* Link Action */}
					<div className="flex items-center gap-2 text-sm font-bold text-white">
						{isEmergency ? "Book Now" : "Learn More"}
						<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</div>
			</div>
		</Link>
	);
}
