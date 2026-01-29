"use client";

import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
	images: {
		src: string;
		caption?: string;
		alt?: string;
	}[];
	layout?: "grid" | "carousel";
	columns?: 2 | 3 | 4;
	className?: string;
}

export function ImageGallery({
	images,
	layout = "grid",
	columns = 3,
	className,
}: ImageGalleryProps) {
	if (layout === "carousel") {
		return (
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className={cn("w-full mx-auto my-6", className)}
			>
				<CarouselContent>
					{images.map((img, index) => (
						<CarouselItem
							key={`${index}-${img.src}`}
							className="md:basis-1/2 lg:basis-1/3 pl-4"
						>
							<div className="relative aspect-video rounded-lg overflow-hidden border border-border">
								<Dialog>
									<DialogTrigger asChild>
										<button
											type="button"
											className="cursor-zoom-in relative w-full h-full group"
											aria-label={`View ${img.alt || img.caption || `gallery image ${index + 1}`} in fullscreen`}
										>
											<Image
												src={img.src}
												alt={
													img.alt || img.caption || `Gallery image ${index + 1}`
												}
												fill
												sizes="(max-width: 768px) 50vw, 33vw"
												className="object-cover transition-transform group-hover:scale-105"
											/>
										</button>
									</DialogTrigger>
									<DialogContent
										className="fixed! inset-0! w-screen! h-screen! max-w-none! max-h-none! translate-x-0! translate-y-0! top-0! left-0! p-0 overflow-hidden bg-black border-none shadow-none rounded-none! flex flex-col items-center justify-center z-9999"
										showCloseButton={false}
									>
										<DialogTitle className="sr-only">
											{img.caption || "Image preview"}
										</DialogTitle>
										{/* Custom close button with better visibility */}
										<DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												aria-hidden="true"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
											<span className="sr-only">Close</span>
										</DialogClose>
										<div className="relative w-full h-[75vh]">
											<Image
												src={img.src}
												alt={
													img.alt || img.caption || `Gallery image ${index + 1}`
												}
												fill
												sizes="100vw"
												className="object-contain"
												priority
											/>
										</div>
										{img.caption && (
											<p className="text-white/90 text-center py-4 px-6 text-sm sm:text-base">
												{img.caption}
											</p>
										)}
									</DialogContent>
								</Dialog>
							</div>
							{img.caption && (
								<p className="text-sm text-muted-foreground mt-2 text-center">
									{img.caption}
								</p>
							)}
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		);
	}

	return (
		<div
			className={cn(
				"grid gap-4 my-6",
				columns === 2 && "grid-cols-1 sm:grid-cols-2",
				columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
				columns === 4 && "grid-cols-2 md:grid-cols-4",
				className,
			)}
		>
			{images.map((img, index) => (
				<div key={`${index}-${img.src}`} className="space-y-2">
					<Dialog>
						<DialogTrigger asChild>
							<button
								type="button"
								className="relative aspect-video rounded-lg overflow-hidden border border-border cursor-zoom-in group w-full"
								aria-label={`View ${img.alt || img.caption || `gallery image ${index + 1}`} in fullscreen`}
							>
								<Image
									src={img.src}
									alt={img.alt || img.caption || `Gallery image ${index + 1}`}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
									className="object-cover transition-transform group-hover:scale-105"
								/>
							</button>
						</DialogTrigger>
						<DialogContent
							className="fixed! inset-0! w-screen! h-screen! max-w-none! max-h-none! translate-x-0! translate-y-0! top-0! left-0! p-0 overflow-hidden bg-black border-none shadow-none rounded-none! flex flex-col items-center justify-center z-9999"
							showCloseButton={false}
						>
							<DialogTitle className="sr-only">
								{img.caption || "Image preview"}
							</DialogTitle>
							{/* Custom close button with better visibility */}
							<DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
								<span className="sr-only">Close</span>
							</DialogClose>
							<div className="relative w-full h-[75vh]">
								<Image
									src={img.src}
									alt={img.alt || img.caption || `Gallery image ${index + 1}`}
									fill
									sizes="100vw"
									className="object-contain"
									priority
								/>
							</div>
							{img.caption && (
								<p className="text-white/90 text-center py-4 px-6 text-sm sm:text-base">
									{img.caption}
								</p>
							)}
						</DialogContent>
					</Dialog>
					{img.caption && (
						<p className="text-sm text-muted-foreground text-center">
							{img.caption}
						</p>
					)}
				</div>
			))}
		</div>
	);
}
