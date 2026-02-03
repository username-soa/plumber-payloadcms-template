import { Briefcase } from "lucide-react";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export function CaseStudiesHero() {
	return (
		<section className="relative py-20 max-md:pt-28 md:py-32 overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />

			{/* Floating shapes */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

			<div className="container mx-auto px-6 relative z-10">
				<div className="max-w-3xl mx-auto text-center space-y-6">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
						<Briefcase className="w-4 h-4" />
						Our Work
					</div>
					<TypographyH1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
						Our{" "}
						<span className="text-primary relative inline-block">
							Success
							<svg
								className="absolute -bottom-2 left-0 w-full"
								viewBox="0 0 200 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									d="M2 8 C 50 2, 150 2, 198 8"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinecap="round"
									className="text-primary/30"
								/>
							</svg>
						</span>{" "}
						Stories
					</TypographyH1>
					<TypographyP className="text-xl text-muted-foreground mt-0">
						See how we've helped homeowners and businesses across Water City
						solve their plumbing challenges with precision and care.
					</TypographyP>
				</div>
			</div>
		</section>
	);
}
