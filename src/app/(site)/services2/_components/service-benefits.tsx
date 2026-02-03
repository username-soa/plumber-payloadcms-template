import { CheckCircle2 } from "lucide-react";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

interface ServiceBenefitsProps {
	benefits: string[];
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
	if (!benefits || benefits.length === 0) return null;

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<TypographyH2>Why Choose Our Service?</TypographyH2>
					<TypographyMuted>
						We pride ourselves on delivering top-tier quality and exceptional
						customer care.
					</TypographyMuted>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{benefits.map((benefit) => (
						<div
							key={benefit}
							className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors"
						>
							<div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
								<CheckCircle2 className="w-6 h-6" />
							</div>
							<p className="font-semibold text-lg">{benefit}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
