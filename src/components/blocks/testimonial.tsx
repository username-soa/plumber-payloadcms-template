"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
	quote: string;
	author: string;
	role?: string;
	avatar?: string;
	className?: string;
}

export function Testimonial({
	quote,
	author,
	role,
	avatar,
	className,
}: TestimonialProps) {
	return (
		<Card
			className={cn(
				"my-8 bg-muted/30 border-border/50 relative not-prose overflow-visible",
				className,
			)}
		>
			<CardContent className="p-8">
				<Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20 rotate-180" />
				<blockquote className="relative z-10 text-lg md:text-xl font-medium text-foreground italic leading-relaxed text-center px-4">
					"{quote}"
				</blockquote>
				<figcaption className="mt-6 flex flex-col items-center justify-center gap-2">
					{avatar && (
						<div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/20 pointer-events-none">
							<Image
								src={avatar}
								alt={author}
								fill
								sizes="48px"
								className="object-cover"
							/>
						</div>
					)}
					<div className="text-center">
						<div className="font-semibold text-foreground">{author}</div>
						{role && (
							<div className="text-sm text-muted-foreground">{role}</div>
						)}
					</div>
				</figcaption>
			</CardContent>
		</Card>
	);
}
