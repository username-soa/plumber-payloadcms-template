'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';
import type { CaseStudy } from '@/payload-types';
import { SingleCaseStudyHero } from '@/app/(site)/case-studies/_components/single-case-study-hero';
import { CaseStudyContent } from '@/app/(site)/case-studies/_components/case-study-content';
import { CaseStudySidebar } from '@/app/(site)/case-studies/_components/case-study-sidebar';

interface CaseStudyLivePreviewProps {
	initialData: CaseStudy;
}

/**
 * Client component for Case Studies live preview.
 */
export function CaseStudyLivePreview({ initialData }: CaseStudyLivePreviewProps) {
	const { data } = useLivePreview<CaseStudy>({
		initialData,
		serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
		depth: 3,
	});

	return (
		<article className="min-h-screen pb-20">
			<SingleCaseStudyHero study={data} />

			<div className="container px-6 mx-auto mt-12 md:mt-16">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
					<CaseStudyContent study={data} />
					<CaseStudySidebar study={data} />
				</div>
			</div>
		</article>
	);
}
