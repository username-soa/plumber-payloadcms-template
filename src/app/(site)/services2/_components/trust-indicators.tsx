import { ShieldCheck, Banknote, Clock, Award } from "lucide-react";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

export const TRUST_FACTORS = [
	{
		title: "Licensed & Insured",
		description: "Fully certified professionals for your peace of mind.",
		icon: ShieldCheck,
	},
	{
		title: "Upfront Pricing",
		description: "No hidden fees. You know the price before we start.",
		icon: Banknote,
	},
	{
		title: "Parts Warranty",
		description: "We stand behind our work with comprehensive guarantees.",
		icon: Award,
	},
	{
		title: "On-Time Arrival",
		description: "We respect your time and arrive when we say we will.",
		icon: Clock,
	},
];

export function TrustIndicators() {
	return (
		<section className="py-16 bg-muted/20">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{TRUST_FACTORS.map((factor) => (
						<div key={factor.title} className="flex gap-4 items-start">
							<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
								<factor.icon className="w-6 h-6" />
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">{factor.title}</h3>
								<p className="text-sm text-muted-foreground">
									{factor.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
