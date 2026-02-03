import {
	ShieldCheck,
	Award,
	Building2,
	Lock,
	BadgeCheck,
	Leaf,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

const iconMap = {
	ShieldCheck,
	Award,
	Building2,
	Lock,
	BadgeCheck,
	Leaf,
};

export function Certifications() {
	const { certifications } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<span className="uppercase tracking-wider text-sm">
							Credentials
						</span>
					</div>
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
						Fully Licensed,{" "}
						<span className="text-primary">Bonded & Insured</span>
					</TypographyH2>
					<TypographyMuted className="text-base">
						Your peace of mind is our priority. {SITE_CONFIG.brand.name} meets
						and exceeds all state and local requirements for plumbing
						contractors.
					</TypographyMuted>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{certifications.map((cert) => {
						const Icon =
							iconMap[cert.icon as keyof typeof iconMap] || ShieldCheck;

						return (
							<div
								key={cert.name}
								className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl border hover:border-primary/50 transition-colors"
							>
								<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
									<Icon className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold mb-1">{cert.name}</h3>
									<p className="text-sm text-muted-foreground">
										{cert.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
