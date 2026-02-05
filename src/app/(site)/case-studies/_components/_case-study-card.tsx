import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CaseStudy, Media } from "@/payload-types";
import { getCategoryName } from "@/lib/payload-utils";

interface CaseStudyCardProps {
	study: CaseStudy;
	priority?: boolean;
}

export function CaseStudyCard({ study, priority = false }: CaseStudyCardProps) {
	const featuredImage = study.featuredImage as Media | null;
	const imageUrl = featuredImage?.url;

	return (
		<Link
			href={`/case-studies/${study.slug}`}
			className="group block h-full"
			prefetch={false}
		>
			<Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-colors pt-0">
				<div className="relative aspect-4/3 overflow-hidden bg-muted">
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt={study.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							priority={priority}
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
							No Image
						</div>
					)}
					{study.category && (
						<div className="absolute top-4 left-4">
							<Badge
								variant="secondary"
								className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background capitalize"
							>
								{getCategoryName(study.category)}
							</Badge>
						</div>
					)}
				</div>

				<CardHeader className="space-y-2">
					<h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
						{study.title}
					</h2>
					{study.location && (
						<div className="flex items-center text-sm text-muted-foreground gap-1">
							<MapPin className="w-4 h-4" />
							<span>{study.location}</span>
						</div>
					)}
				</CardHeader>

				<CardContent className="grow">
					{study.summary && (
						<p className="text-muted-foreground line-clamp-3">
							{study.summary}
						</p>
					)}
				</CardContent>

				<CardFooter className="pt-0">
					<Button
						variant="link"
						className="p-0! h-auto font-semibold text-primary group-hover:text-primary/80"
						asChild
					>
						<span>
							Read Case Study{" "}
							<ArrowRight className="w-4 h-4 ml-1 transition-transform -rotate-45 group-hover:rotate-0" />
						</span>
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
