import Link from "next/link";
import dynamic from "next/dynamic";
import { MessageCircleQuestion, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";

// Skeleton Loader for the Accordion
const FAQSkeleton = () => (
	<div className="w-full flex flex-col gap-4">
		{[1, 2, 3, 4, 5].map((i) => (
			<div
				key={i}
				className="h-20 w-full rounded-xl bg-card/50 animate-pulse border border-border/10"
			/>
		))}
	</div>
);

// Dynamic import for the Accordion
const FAQAccordion = dynamic(() => import("./faq-accordion"), {
	loading: () => <FAQSkeleton />,
});

export function FAQSection() {
	return (
		<section className="w-full py-24 bg-muted/20">
			<div className="container mx-auto px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					{/* Left Column: Header & Info Card */}
					<div className="flex flex-col gap-6 lg:sticky top-8">
						<div className="flex items-center gap-2 text-primary font-medium">
							<MessageCircleQuestion className="w-5 h-5" />
							<span className="uppercase tracking-wider text-sm">FAQ</span>
						</div>

						<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight">
							Your Questions, Our Answers{" "}
							<span className="text-primary">Clear, Honest And Helpful</span>
						</TypographyH2>

						<TypographyMuted className="text-lg  max-w-md">
							Have questions about our plumbing services? We&apos;re here to
							make everything clear. From booking to pricing, find your answers
							here.
						</TypographyMuted>

						<Card className="bg-card/50 border-none shadow-sm max-w-md">
							<CardContent className="p-4 flex flex-col gap-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
										<MessageCircleQuestion className="w-8 h-8" />
									</div>
									<div>
										<TypographyH3 className="text-lg font-bold mb-2">
											Still Have Questions?
										</TypographyH3>
										<TypographyMuted>
											Can&apos;t find the answer you&apos;re looking for? Our
											team is here to help!
										</TypographyMuted>
									</div>
								</div>
								<Button
									className="w-full h-12 text-base font-semibold shadow-md"
									asChild
								>
									<Link href="/contact">
										Contact Support <ArrowRight className="ml-2 w-4 h-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Right Column: Accordion */}
					<div className="w-full">
						<FAQAccordion />
					</div>
				</div>
			</div>
		</section>
	);
}
