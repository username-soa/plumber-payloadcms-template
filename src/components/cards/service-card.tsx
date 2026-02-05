import Link from "next/link";
import type { Service } from "@/payload-types";
import { Badge } from "@/components/ui/badge";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
	service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
	return (
		<Link
			href={`/services/${service.slug}`}
			className="group flex flex-col h-full p-8 transition-all duration-300 hover:bg-muted bg-background"
		>
			<div
				className={cn(
					"mb-3",
					service.isEmergency && "flex items-center justify-between",
				)}
			>
				<div
					className={
						"md:size-10 size-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 bg-background"
					}
				>
					<DynamicIcon
						name={service.icon as string}
						className="md:size-5 size-4"
					/>
				</div>
				{service.isEmergency && (
					<Badge
						size="sm"
						variant="destructive"
						className="shrink-0 text-red-950 bg-destructive/70"
					>
						24/7 Emergency
					</Badge>
				)}
			</div>

			<TypographyH2 className="text-2xl font-semibold mb-2 text-foreground border-none">
				{service.title}
			</TypographyH2>

			<TypographyMuted className="text-base line-clamp-3">
				{service.description}
			</TypographyMuted>
		</Link>
	);
}
