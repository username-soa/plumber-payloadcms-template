export function JsonLd({ data }: { data: Record<string, unknown> | object }) {
	// Serialize and sanitize the JSON to prevent XSS.
	// We escape '<' to preventing attackers from closing the script tag and injecting malicious HTML.
	// This is the standard safe way to inline JSON-LD.
	const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because we sanitize the input.
			dangerouslySetInnerHTML={{ __html: jsonString }}
		/>
	);
}
