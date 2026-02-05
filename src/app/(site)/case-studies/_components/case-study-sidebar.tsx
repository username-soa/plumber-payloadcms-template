import Link from "next/link";
import { TableOfContents } from "../../blog/_components/table-of-contents";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/payload-types";
import { getCategoryName } from "@/lib/payload-utils";
import { SITE_CONFIG } from "@/lib/site-config";

const { seo } = SITE_CONFIG;

interface CaseStudySidebarProps {
	study: CaseStudy;
}

export function CaseStudySidebar({ study }: CaseStudySidebarProps) {
	return (
		<aside className="space-y-8">
			<div className="sticky top-8 space-y-8">
				<div className="bg-muted/30 rounded-xl p-6 border border-border">
					<h3 className="font-semibold text-lg mb-4">Project Details</h3>
					<dl className="space-y-4 text-sm">
						{typeof study.relatedService === "object" &&
							study.relatedService && (
								<div>
									<dt className="text-muted-foreground mb-1">Service Type</dt>
									<dd className="font-medium text-foreground text-base">
										<Link
											href={`/services/${study.relatedService.slug}`}
											className="text-primary hover:underline"
										>
											{study.relatedService.title}
										</Link>
									</dd>
								</div>
							)}

						{study.category && (
							<>
								<div className="h-px bg-border" />
								<div>
									<dt className="text-muted-foreground mb-1">Category</dt>
									<dd className="font-medium text-foreground text-base capitalize">
										{getCategoryName(study.category)}
									</dd>
								</div>
							</>
						)}

						{study.completedAt && (
							<>
								<div className="h-px bg-border" />
								<div>
									<dt className="text-muted-foreground mb-1">Date</dt>
									<dd className="font-medium text-foreground text-base">
										{new Date(study.completedAt).toLocaleDateString("en-US", {
											month: "long",
											year: "numeric",
										})}
									</dd>
								</div>
							</>
						)}

						{study.duration && (
							<>
								<div className="h-px bg-border" />
								<div>
									<dt className="text-muted-foreground mb-1">Duration</dt>
									<dd className="font-medium text-foreground text-base">
										{study.duration}
									</dd>
								</div>
							</>
						)}

						{study.location && (
							<>
								<div className="h-px bg-border" />
								<div>
									<dt className="text-muted-foreground mb-1">Location</dt>
									<dd className="font-medium text-foreground text-base">
										{study.location}
									</dd>
								</div>
							</>
						)}

						{study.budget && (
							<>
								<div className="h-px bg-border" />
								<div>
									<dt className="text-muted-foreground mb-1">Budget</dt>
									<dd className="font-medium text-foreground text-base">
										{study.budget}
									</dd>
								</div>
							</>
						)}
					</dl>
				</div>

				<div className="bg-muted/30 rounded-xl p-6 border border-border hidden lg:block">
					<TableOfContents />
				</div>

				<div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
					<h3 className="font-bold text-xl mb-2">
						Need a similar repair in {seo.location.city}?
					</h3>
					<p className="text-primary-foreground mb-6">
						Contact us today for a free consultation about your plumbing needs.
					</p>
					<Button asChild variant="secondary" className="w-full font-semibold">
						<Link href="/contact">Get a Quote</Link>
					</Button>
				</div>
			</div>
		</aside>
	);
}
