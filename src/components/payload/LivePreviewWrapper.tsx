'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';

interface LivePreviewWrapperProps<T> {
	initialData: T;
	children: (data: T) => React.ReactNode;
}

/**
 * Generic client component that wraps page content to subscribe to
 * real-time live preview updates from the Payload CMS admin panel.
 *
 * Usage: wrap your page render return with this component, passing the
 * server-fetched data as `initialData`. The `children` render prop receives
 * the live-updated data and re-renders automatically when the editor changes
 * a field value, without saving.
 */
export function LivePreviewWrapper<T extends object>({
	initialData,
	children,
}: LivePreviewWrapperProps<T>) {
	const { data } = useLivePreview<T>({
		initialData,
		serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
		depth: 3,
	});

	return <>{children(data)}</>;
}
