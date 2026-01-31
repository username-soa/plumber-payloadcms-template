/**
 * BreadcrumbList Schema Generator
 *
 * Generates Schema.org BreadcrumbList structured data
 * for navigation context.
 */

import { SITE_CONFIG } from "../site-config";

export interface BreadcrumbInput {
	name: string;
	href?: string;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbInput[]) {
	const { siteUrl } = SITE_CONFIG.seo;

	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => {
			const listItem: {
				"@type": string;
				position: number;
				name: string;
				item?: string;
			} = {
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
			};

			// Only add item URL if not the current page (last item)
			if (item.href && index < items.length - 1) {
				listItem.item = item.href.startsWith("http")
					? item.href
					: `${siteUrl}${item.href}`;
			}

			return listItem;
		}),
	};
}

/**
 * Generate breadcrumbs for a service page
 */
/**
 * Generate breadcrumbs for a service page
 */
export function generateServiceBreadcrumbs(
	serviceTitle: string,
	parentService?: { title: string; slug: string },
) {
	const items: BreadcrumbInput[] = [
		{ name: "Home", href: "/" },
		{ name: "Services", href: "/services" },
	];

	if (parentService) {
		items.push({
			name: parentService.title,
			href: `/services/${parentService.slug}`,
		});
	}

	items.push({ name: serviceTitle });

	return generateBreadcrumbSchema(items);
}

/**
 * Generate breadcrumbs for a blog post
 */
export function generateBlogBreadcrumbs(postTitle: string) {
	return generateBreadcrumbSchema([
		{ name: "Home", href: "/" },
		{ name: "Blog", href: "/blog" },
		{ name: postTitle },
	]);
}

/**
 * Generate breadcrumbs for a case study
 */
export function generateCaseStudyBreadcrumbs(caseStudyTitle: string) {
	return generateBreadcrumbSchema([
		{ name: "Home", href: "/" },
		{ name: "Case Studies", href: "/case-studies" },
		{ name: caseStudyTitle },
	]);
}
