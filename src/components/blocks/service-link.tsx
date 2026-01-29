"use client";

import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceLinkProps {
	slug: string;
	label?: string;
	className?: string;
}

export function ServiceLink({ slug, label, className }: ServiceLinkProps) {
	return (
		<Link
			href={`/services/${slug}`}
			className={cn(
				"inline-flex items-center gap-2 text-primary font-medium hover:underline group not-prose",
				className,
			)}
		>
			<Wrench className="w-4 h-4" />
			<span>{label || "View Related Service"}</span>
			<ArrowRight className="w-4 h-4 transition-transform -rotate-45 group-hover:rotate-0" />
		</Link>
	);
}
