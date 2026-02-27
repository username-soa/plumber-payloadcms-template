/**
 * Content Fetcher
 * Main function for fetching content from Payload CMS.
 *
 * Self-contained — calls getPayload() internally so callers don't need to
 * manage the payload instance. Wrapped in React.cache() for request-level
 * deduplication within a single render pass.
 */

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cache } from "react";
import type {
	ContentType,
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
 * Fetch content from Payload CMS with filters, sorting, and pagination.
 *
 * Wrapped with React.cache() to deduplicate within a render pass — if the
 * same params are passed by multiple components in one request, only one
 * DB query is made.
 */
export const fetchContent = cache(
	async (params: FetchContentParams): Promise<ContentResult> => {
		const payload = await getPayload({ config: configPromise });
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
		const where = await buildWhereClause({
			contentType,
			searchParams,
			featuredOnly,
		});

		const sort = buildSortClause(contentType, sortBy);
		const pagination = calculatePagination({ page, limit, paginationStyle });
		const collectionSlug = COLLECTION_SLUG_MAP[contentType];

		// Execute query — collectionSlug is now correctly typed as a literal union
		const result = await payload.find({
			collection: collectionSlug,
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
			items: result.docs,
			totalPages,
			totalDocs: result.totalDocs,
			page,
		};
	},
);
