"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import {
	TypographyH2,
	TypographyH3,
	TypographyP,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface ProcessStep {
	title: string;
	description: string;
	icon: string;
}

interface ProcessStepsProps {
	steps?: ProcessStep[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
	// Use provided steps or fall back to global config
	const processSteps = steps && steps.length > 0 ? steps : SITE_CONFIG.process;

	if (!processSteps || processSteps.length === 0) return null;

	return (
		<section className="py-16 md:py-20 bg-background">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<span className="text-primary font-semibold text-sm uppercase tracking-wider">
						Our Process
					</span>
					<TypographyH2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-4 border-none">
						How It Works
					</TypographyH2>
					<TypographyP className="text-muted-foreground text-lg mt-0">
						Simple, transparent, and stress-free service in{" "}
						{processSteps.length} easy steps.
					</TypographyP>
				</div>

				<div
					className={cn(
						"grid gap-6",
						processSteps.length === 3
							? "grid-cols-1 md:grid-cols-3"
							: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
					)}
				>
					{processSteps.map((step, index) => {
						const Icon =
							(Icons as unknown as Record<string, LucideIcon>)[step.icon] ||
							Icons.Wrench;
						return (
							<SpotlightCard key={step.title} className="h-full">
								<div className="relative z-20 flex flex-col items-start text-start h-full p-8">
									<div className="mb-6 relative">
										<div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
										<div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
											<Icon className="w-8 h-8" />
										</div>
									</div>

									<TypographyH3 className="text-xl font-bold mb-3 text-card-foreground">
										{index + 1}. {step.title}
									</TypographyH3>
									<TypographyP className="text-muted-foreground leading-relaxed mt-0">
										{step.description}
									</TypographyP>
								</div>
							</SpotlightCard>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function SpotlightCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-200",
				className,
			)}
		>
			<div className="relative">{children}</div>
		</div>
	);
}

/*
    Note: For the --primary-rgb variable to work in the gradient, we might need it defined in globals.css. 
    Alternatively, using hsl(var(--primary) / 0.15) works if tailwind is set up that way.
    For this implementation, I used a direct hsl color approach in the border highlight 
    and a fallback approach for the background glow.
*/
