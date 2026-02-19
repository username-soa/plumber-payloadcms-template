import { draftMode } from 'next/headers';

/**
 * Disables Next.js Draft Mode.
 * Called when the user exits the live preview panel.
 */
export async function GET() {
	(await draftMode()).disable();
	return new Response('Draft mode disabled', { status: 200 });
}
