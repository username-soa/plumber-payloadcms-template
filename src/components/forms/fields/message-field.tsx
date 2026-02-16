"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";

type MessageFieldProps = {
	message: any; // Using any for RichText content as per payload strict types
};

export function MessageField({ message }: MessageFieldProps) {
	if (!message) return null;

	return (
		<div className="prose dark:prose-invert max-w-none">
			<RichText data={message} />
		</div>
	);
}
