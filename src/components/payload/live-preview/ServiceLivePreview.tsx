'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';
import type { Service } from '@/payload-types';
import { Hero } from '@/components/heroes';
import { ServiceDetails } from '@/app/(site)/services/_components/service-details';

interface ServiceHeroLivePreviewProps {
	initialData: Service;
	subServices: {
		title: string;
		description: string;
		icon: string;
		slug: string;
	}[];
	serviceImage: string;
	staticProcess?: { title: string; description: string; icon: string }[];
}

/**
 * Client component for the data-driven parts of the Services live preview.
 * Only wraps Hero + ServiceDetails (fields that change via Payload editor).
 *
 * Static sections (QuoteFormCTA, ReviewSection, ProcessSteps, ServiceFAQ,
 * RelatedServices, WhyChooseUs) are rendered by the Server Component so
 * they never touch the client bundle and can safely use server-only imports.
 */
export function ServiceLivePreview({
	initialData,
	subServices,
	serviceImage,
	staticProcess,
}: ServiceHeroLivePreviewProps) {
	const { data } = useLivePreview<Service>({
		initialData,
		serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
		depth: 3,
	});

	return (
		<>
			<Hero hero={data.hero} title={data.title} />
			<ServiceDetails
				title={data.title}
				longDescription={data.longDescription || data.description}
				subServices={subServices}
				process={staticProcess}
				image={serviceImage}
			/>
		</>
	);
}
