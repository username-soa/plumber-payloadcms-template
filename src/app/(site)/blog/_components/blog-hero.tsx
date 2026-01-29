import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export function BlogHero() {
	return (
		<section className="relative bg-primary/5 pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
			<div className="container px-6 mx-auto relative z-10">
				<div className="max-w-4xl mx-auto text-center space-y-6">
					<Badge
						variant="outline"
						className="border-primary/20 bg-primary/10 text-primary mb-4"
					>
						Our Blog
					</Badge>
					<TypographyH1 className="text-4xl md:text-6xl font-bold tracking-tight">
						Expert Advice & Industry News
					</TypographyH1>
					<TypographyP className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
						Stay up to date with the latest plumbing tips, maintenance guides,
						and news from {SITE_CONFIG.brand.name}.
					</TypographyP>
				</div>
			</div>

			{/* Decorative elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl opacity-50" />
				<div className="absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
			</div>
		</section>
	);
}
