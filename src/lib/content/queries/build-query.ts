/**
 * Query Builder
 * Utilities for constructing Payload CMS where clauses and sort options
 */

import type { Where } from "payload";
import type { Payload } from "payload";
import type { ContentType, SortOption, SearchParams } from "../types";
import { resolveCategorySlug, resolveTagSlug } from "../fetchers/fetch-filters";

// =============================================================================
// Where Clause Builder
// =============================================================================

export interface BuildWhereParams {
	contentType: ContentType;
	searchParams: SearchParams;
	featuredOnly: boolean;
}

/**
 * Build the where clause for content queries
 * Handles category, tag, search, featured, and status filters
 */
export async function buildWhereClause(
	payload: Payload,
	params: BuildWhereParams,
): Promise<Where> {
	const { contentType, searchParams, featuredOnly } = params;
	const where: Where = {};

	// Category filter
	if (searchParams.category && searchParams.category !== "all") {
		if (contentType === "services" && searchParams.category === "emergency") {
			where.isEmergency = { equals: true };
		} else if (contentType === "services" && searchParams.category === "main") {
			where.parentService = { exists: false };
		} else {
			// For blogs and case-studies, resolve category slug to ID
			const categoryId = await resolveCategorySlug(
				payload,
				searchParams.category,
			);
			if (categoryId) {
				where.category = { equals: categoryId };
			}
		}
	}

	// Tag filter (only for blogs and case-studies)
	if (
		searchParams.tag &&
		searchParams.tag !== "all" &&
		contentType !== "services"
	) {
		const tagId = await resolveTagSlug(payload, searchParams.tag);
		if (tagId) {
			where.tags = { contains: tagId };
		}
	}

	// Featured filter
	if (featuredOnly && contentType !== "services") {
		where.featured = { equals: true };
	}

	// Search filter
	if (searchParams.search) {
		where.or = [
			{ title: { contains: searchParams.search } },
			...(contentType !== "services"
				? [{ summary: { contains: searchParams.search } }]
				: [{ description: { contains: searchParams.search } }]),
		];
	}

	// Status filter for blogs (uses custom status field)
	if (contentType === "blogs") {
		where.status = { equals: "published" };
	}

	// Status filter for case-studies (uses Payload's internal _status field from drafts feature)
	if (contentType === "case-studies") {
		where._status = { equals: "published" };
	}

	return where;
}

// =============================================================================
// Sort Clause Builder
// =============================================================================

/**
 * Build the sort string for content queries
 */
export function buildSortClause(
	contentType: ContentType,
	sortBy: SortOption,
): string {
	switch (sortBy) {
		case "oldest":
			return contentType === "blogs"
				? "publishedAt"
				: contentType === "case-studies"
					? "completedAt"
					: "createdAt";
		case "titleAsc":
			return "title";
		case "titleDesc":
			return "-title";
		default:
			return contentType === "blogs"
				? "-publishedAt"
				: contentType === "case-studies"
					? "-completedAt"
					: "-createdAt";
	}
}

// =============================================================================
// Pagination Helpers
// =============================================================================

export interface PaginationParams {
	page: number;
	limit: number;
	paginationStyle: "none" | "numbered" | "loadMore" | "infiniteScroll";
}

/**
 * Calculate pagination parameters based on style
 * For load more / infinite scroll, we fetch all pages up to current
 */
export function calculatePagination(params: PaginationParams): {
	limit: number;
	page: number;
} {
	const { page, limit, paginationStyle } = params;

	if (paginationStyle === "loadMore" || paginationStyle === "infiniteScroll") {
		return {
			limit: limit * page,
			page: 1,
		};
	}

	return { limit, page };
}

/**
 * Calculate total pages based on pagination style
 */
export function calculateTotalPages(
	totalDocs: number,
	limit: number,
	paginationStyle: "none" | "numbered" | "loadMore" | "infiniteScroll",
	serverTotalPages: number,
): number {
	if (paginationStyle === "loadMore" || paginationStyle === "infiniteScroll") {
		return Math.ceil(totalDocs / limit);
	}
	return serverTotalPages;
}
