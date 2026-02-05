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
import type { CaseStudy, Media, Tag } from "@/payload-types";
import { getCategoryName, getTagName } from "@/lib/payload-utils";

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
			<Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg pt-0">
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
					<div className="absolute top-4 left-4 flex gap-2">
						{study.featured && (
							<Badge className="bg-primary text-primary-foreground shadow-lg">
								Featured
							</Badge>
						)}
						{study.category && (
							<Badge
								variant="secondary"
								className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background capitalize"
							>
								{getCategoryName(study.category)}
							</Badge>
						)}
						{study.tags &&
							study.tags.length > 0 &&
							study.tags.slice(0, 2).map((tag) => (
								<Badge
									key={typeof tag === "number" ? tag : tag.id}
									variant="secondary"
									className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background capitalize"
								>
									{getTagName(tag as Tag)}
								</Badge>
							))}
					</div>
				</div>

				<CardHeader className="space-y-2">
					<h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
						{study.title}
					</h3>
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
						className="p-0! h-auto font-semibold text-primary group-hover:text-primary/80 cursor-pointer"
					>
						Read Case Study{" "}
						<ArrowRight className="w-4 h-4 transition-transform -rotate-45 group-hover:rotate-0" />
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
