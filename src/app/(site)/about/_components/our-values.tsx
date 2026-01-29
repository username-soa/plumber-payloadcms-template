import { Heart, Star, Users, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

const iconMap = {
	Heart,
	Star,
	Users,
	Clock,
};

export function OurValues() {
	const { values } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<span className="uppercase tracking-wider text-sm">Our Values</span>
					</div>
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
						Why <span className="text-primary">Water City</span> Trusts
						FlowMasters
					</TypographyH2>
					<TypographyMuted className="text-base">
						For nearly two decades, we've built our reputation on these core
						principles that guide every job we do.
					</TypographyMuted>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
					{values.map((value) => {
						const Icon = iconMap[value.icon as keyof typeof iconMap] || Heart;

						return (
							<div
								key={value.title}
								className="flex items-start gap-4 p-6 bg-background rounded-2xl border"
							>
								<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
									<Icon className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-lg mb-2">{value.title}</h3>
									<p className="text-muted-foreground">{value.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
