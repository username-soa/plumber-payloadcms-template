'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';
import type { Page } from '@/payload-types';
import { Hero } from '@/components/heroes';

interface PageLivePreviewProps {
	initialData: Page;
}

/**
 * Client component for Pages live preview.
 * ONLY wraps the Hero section — the part driven directly by Payload fields.
 *
 * RenderBlocks (which includes ContentFetcher) cannot be placed in a Client
 * Component because ContentFetcher is an async Server Component that calls
 * getPayload() / payload.config.ts directly. It stays in the Server Component
 * page and re-renders on save/route refresh.
 */
export function PageLivePreview({ initialData }: PageLivePreviewProps) {
	const { data } = useLivePreview<Page>({
		initialData,
		serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
		depth: 3,
	});

	return <Hero page={data} />;
}
