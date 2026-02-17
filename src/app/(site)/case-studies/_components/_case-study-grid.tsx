import { SearchX } from "lucide-react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { CaseStudy } from "@/payload-types";
import { CaseStudyCard } from "./_case-study-card";

async function getCaseStudies(): Promise<CaseStudy[]> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "case-studies",
		limit: 100,
		sort: "-completedAt",
		where: {
			_status: { equals: "published" },
		},
	});
	return result.docs;
}

export async function CaseStudyGrid() {
	const caseStudies = await getCaseStudies();

	if (caseStudies.length === 0) {
		return (
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container mx-auto px-6 max-w-md text-center">
					<div className="bg-background rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
						<SearchX className="w-8 h-8 text-muted-foreground" />
					</div>
					<h2 className="text-xl font-semibold mb-2">No case studies found</h2>
					<p className="text-muted-foreground">
						We haven't published any case studies yet. Please check back later.
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{caseStudies.map((study, index) => (
						<CaseStudyCard
							key={study.id}
							study={study}
							priority={index === 0}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
