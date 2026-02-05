/**
 * Content Fetcher
 * Main function for fetching content from Payload CMS
 */

import type { Payload } from "payload";
import type {
	ContentType,
	ContentItem,
	ContentResult,
	SortOption,
	SearchParams,
	PaginationStyle,
} from "../types";
import { COLLECTION_SLUG_MAP } from "../types";
import {
	buildWhereClause,
	buildSortClause,
	calculatePagination,
	calculateTotalPages,
} from "../queries/build-query";

// =============================================================================
// Fetch Content
// =============================================================================

export interface FetchContentParams {
	contentType: ContentType;
	page: number;
	limit: number;
	sortBy: SortOption;
	searchParams: SearchParams;
	featuredOnly: boolean;
	paginationStyle: PaginationStyle;
}

/**
 * Fetch content from Payload CMS with filters, sorting, and pagination
 */
export async function fetchContent(
	payload: Payload,
	params: FetchContentParams,
): Promise<ContentResult> {
	const {
		contentType,
		page,
		limit,
		sortBy,
		searchParams,
		featuredOnly,
		paginationStyle,
	} = params;

	// Build query parts
	const where = await buildWhereClause(payload, {
		contentType,
		searchParams,
		featuredOnly,
	});

	const sort = buildSortClause(contentType, sortBy);
	const pagination = calculatePagination({ page, limit, paginationStyle });
	const collectionSlug = COLLECTION_SLUG_MAP[contentType];

	// Execute query
	const result = await payload.find({
		collection: collectionSlug as "blog-posts" | "case-studies" | "services",
		where,
		sort,
		limit: pagination.limit,
		page: pagination.page,
		depth: 2,
	});

	// Calculate total pages
	const totalPages = calculateTotalPages(
		result.totalDocs,
		limit,
		paginationStyle,
		result.totalPages,
	);

	return {
		items: result.docs as ContentItem[],
		totalPages,
		totalDocs: result.totalDocs,
		page,
	};
}
