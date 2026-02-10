import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CMSLinkType } from "@/lib/cms-link";
import { getCMSLinkHref } from "@/lib/cms-link";

export function CMSLink({
	link,
	className,
	look, // optional override
}: {
	link?: CMSLinkType | null;
	className?: string;
	look?: "default" | "secondary" | "outline" | "ghost" | "destructive";
}) {
	if (!link) return null;

	const href = getCMSLinkHref(link);

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

	// 2) Handle Button/Link rendering
	const appearance =
		look ||
		(link.style === "secondary" ||
		link.style === "outline" ||
		link.style === "ghost" ||
		link.style === "destructive"
			? link.style
			: "default");

	// 3) Handle Primary Gradient Dots CTA
	if (link.style === "primary-gradient-dots") {
		const { ArrowRight } = require("lucide-react"); // Dynamic import or move to top if possible
		return (
			<Link
				href={href}
				target={link.newTab ? "_blank" : undefined}
				className={cn(
					"relative group overflow-hidden rounded-full py-4 px-8 inline-flex items-center gap-2 text-primary-foreground font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl shadow-primary/20",
					className,
				)}
			>
				<div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/90 transition-all duration-300 group-hover:brightness-110" />
				<div
					className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
						backgroundSize: "10px 10px",
					}}
				/>
				<span className="relative z-10 flex items-center gap-2 text-lg">
					{link.label} <ArrowRight className="w-5 h-5" />
				</span>
			</Link>
		);
	}

	// 4) Default Button/Link rendering
	return (
		<Button
			asChild
			variant={appearance}
			size="xl"
			className={cn("rounded-full", className)}
		>
			<Link href={href} target={link.newTab ? "_blank" : undefined}>
				{link.label}
			</Link>
		</Button>
	);
}
