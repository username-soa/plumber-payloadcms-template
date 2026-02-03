import type { Page, Service } from "@/payload-types";

type Reference = {
	relationTo: "pages" | "services";
	value: string | Page | Service;
};

export type CMSLinkType = {
	type: "reference" | "custom" | "email" | "phone" | "badge";
	label: string;
	url?: string | null;
	newTab?: boolean | null;
	email?: string | null;
	phoneNumber?: string | null;
	reference?: Reference | null;
	style?:
		| "primary"
		| "secondary"
		| "outline"
		| "ghost"
		| "destructive"
		| "badge"
		| "badge-pulsing";
};

export function getCMSLinkHref(link: CMSLinkType | null | undefined): string {
	if (!link) return "#";

	if (link.type === "custom" && link.url) {
		return link.url;
	}

	if (
		link.type === "reference" &&
		link.reference &&
		typeof link.reference.value === "object"
	) {
		const slug = link.reference.value.slug;
		const relation = link.reference.relationTo;

		if (relation === "pages") {
			return slug === "home" ? "/" : `/${slug}`;
		} else if (relation === "services") {
			return `/services/${slug}`;
		}
	}

	if (link.type === "email" && link.email) {
		return `mailto:${link.email}`;
	}

	if (link.type === "phone" && link.phoneNumber) {
		return `tel:${link.phoneNumber}`;
	}

	return "#";
}
