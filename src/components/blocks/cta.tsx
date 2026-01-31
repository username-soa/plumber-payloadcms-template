"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CTAProps {
	title: string;
	description?: string;
	buttonText: string;
	href: string;
	className?: string;
}

export function CTA({
	title,
	description,
	buttonText,
	href,
	className,
}: CTAProps) {
	return (
		<div
			className={cn(
				"my-8 p-8 rounded-2xl bg-primary text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg not-prose",
				className,
			)}
		>
			<div className="space-y-2 text-center md:text-left">
				<h3 className="text-2xl font-bold">{title}</h3>
				{description && (
					<p className="text-primary-foreground">{description}</p>
				)}
			</div>
			<Link
				href={href}
				className={cn(
					buttonVariants({ variant: "secondary", size: "lg" }),
					"font-semibold shrink-0 group",
				)}
			>
				{buttonText}
				<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Link>
		</div>
	);
}
