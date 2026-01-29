import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/lib/google-reviews";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
	review: Review;
	className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
	return (
		<Card
			className={cn("border-none shadow-md bg-card/50 h-full p-6", className)}
		>
			<CardContent className="p-0 flex flex-col gap-6 h-full justify-between">
				<div>
					<div className="flex items-center gap-4 mb-4">
						<div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-background shadow-sm shrink-0">
							<Image
								src={review.authorImage}
								alt={review.authorName}
								fill
								sizes="48px"
								className="object-cover"
							/>
						</div>
						<div className="flex-1">
							<span className="font-bold text-sm uppercase tracking-wide text-foreground">
								{review.authorName}
							</span>
							<div className="flex items-center justify-between w-full mt-1">
								<span className="text-xs text-muted-foreground">
									{review.relativeTime}
								</span>
								<div className="flex gap-0.5">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={cn("w-3.5 h-3.5", {
												"fill-yellow-400 text-yellow-400":
													star <= review.rating,
												"fill-muted text-muted": star > review.rating,
											})}
										/>
									))}
								</div>
							</div>
						</div>
					</div>

					<h3 className="font-bold text-lg mb-1.5">
						&quot;{review.title}&quot;
					</h3>
					<p className="text-muted-foreground text-base md:line-clamp-4 line-clamp-5">
						{review.text}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
