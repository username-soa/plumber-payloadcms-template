import config from "@payload-config";
import { getPayload } from "payload";
import { QuoteFormClient } from "./quote-form-client";

// Server Component
interface QuoteFormCTAProps {
	serviceName?: string;
}

export async function QuoteFormCTA({
	serviceName = "General Plumbing",
}: QuoteFormCTAProps) {
	const payload = await getPayload({ config });

	const servicesResult = await payload.find({
		collection: "services",
		// Fetch minimal needed fields for the dropdown
		select: {
			title: true,
			slug: true,
		},
		limit: 100,
		pagination: false,
	});

	return (
		<QuoteFormClient serviceName={serviceName} services={servicesResult.docs} />
	);
}
