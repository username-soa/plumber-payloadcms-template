import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Page, Service } from "@/payload-types";

type Reference = {
	relationTo: "pages" | "services";
	value: string | Page | Service;
};

import { type CMSLinkType } from "@/lib/cms-link";
export type { CMSLinkType };

export function CMSLinkItem({
	link,
	className,
}: {
	link: CMSLinkType;
	className?: string;
}) {
	// 1) Handle Badge rendering
	const isBadge =
		link.type === "badge" ||
		link.style === "badge" ||
		link.style === "badge-pulsing";

	if (isBadge) {
		if (link.style === "badge-pulsing") {
			return (
				<Badge
					variant="outline"
					className={cn(
						"px-4 py-2 text-sm font-semibold bg-green-300/20 backdrop-blur-sm border-green-400/50 text-green-600",
						className,
					)}
				>
					<span className="relative flex h-2.5 w-2.5 mr-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
						<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
					</span>
					{link.label}
				</Badge>
			);
		}
		// Default badge style
		return (
			<Badge
				variant="outline"
				className={cn(
					"px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-white",
					className,
				)}
			>
				{link.label}
			</Badge>
		);
	}

	// 2) Handle Link generation
	let href = "#";

	if (link.type === "custom" && link.url) {
		href = link.url;
	}

	if (
		link.type === "reference" &&
		link.reference &&
		typeof link.reference.value === "object"
	) {
		const slug = link.reference.value.slug;
		const relation = link.reference.relationTo;

		if (relation === "pages") {
			href = slug === "home" ? "/" : `/${slug}`;
		} else if (relation === "services") {
			href = `/services/${slug}`;
		}
	}

	if (link.type === "email" && link.email) {
		href = `mailto:${link.email}`;
	}

	if (link.type === "phone" && link.phoneNumber) {
		href = `tel:${link.phoneNumber}`;
	}

	return (
		<Button
			asChild
			variant={
				link.style === "secondary" ||
				link.style === "outline" ||
				link.style === "ghost" ||
				link.style === "destructive"
					? link.style
					: "default"
			}
			size="xl"
			className={cn("rounded-full", className)}
		>
			<Link href={href} target={link.newTab ? "_blank" : undefined}>
				{link.label}
			</Link>
		</Button>
	);
}
