/**
 * ContentFetcher Component
 *
 * Async Server Component that orchestrates content fetching and rendering for
 * listing pages (blogs, case-studies, services). It composes:
 *
 * - Data layer  : `lib/content` (types, fetchers, query builders)
 * - Filter UI   : `FilterSection` (desktop bar + mobile sheet)
 * - Grid UI     : `ContentGrid` (pure presentational grid)
 * - Pagination  : `PaginationNumbered` | `LoadMoreButton` | `InfiniteScroll`
 *
 * Being a Server Component means all data fetching happens on the server —
 * no client-side loading states or waterfalls for the initial render.
 */

import type { Page } from "@/payload-types";
import {
	BlogCard,
	FeaturedBlogCard,
	CaseStudyCard,
	FeaturedCaseStudyCard,
	ServiceCard,
} from "@/components/cards";
import { TypographyMuted } from "@/components/ui/typography";

// Data layer
import {
	type ContentItem,
	type SearchParams,
	isBlogPost,
	isCaseStudy,
	isService,
	getFilterOptions,
	fetchContent,
} from "@/lib/content";

// Sub-components
import { ContentGrid } from "./ContentGrid";
import { FilterSection } from "./FilterSection";
import { PaginationNumbered } from "./pagination-numbered";
import { LoadMoreButton } from "./load-more-button";
import { InfiniteScroll } from "./infinite-scroll";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";

// Re-export for backwards compatibility
export type { CategoryOption, TagOption } from "@/lib/content";

// =============================================================================
// Types
// =============================================================================

type ContentFetcherProps = Extract<
	Page["layout"][0],
	{ blockType: "contentFetcher" }
> & {
	/** Runtime-only: injected by RenderBlocks from URL search params */
	searchParams?: SearchParams;
};

// =============================================================================
// Error fallback
// =============================================================================

function ContentFetcherError() {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-6 text-center">
				<TypographyMuted className="text-lg">
					Unable to load content. Please try again later.
				</TypographyMuted>
			</div>
		</section>
	);
}

// =============================================================================
// Card renderer factory
// =============================================================================

/**
 * Returns a render function for a single content item.
 * Defined at module scope (not inside the component) so it is never recreated
 * across renders — the factory itself is pure and has no closure over state.
 */
function createCardRenderer() {
	return (item: ContentItem, index: number) => {
		// Featured items span the full grid width
		const isFeatured =
			(isBlogPost(item) || isCaseStudy(item)) &&
			"featured" in item &&
			item.featured;

		const card = (() => {
			if (isBlogPost(item)) {
				return isFeatured ? (
					<FeaturedBlogCard post={item} priority={index < 3} />
				) : (
					<BlogCard post={item} priority={index < 3} />
				);
			}
			if (isCaseStudy(item)) {
				return isFeatured ? (
					<FeaturedCaseStudyCard study={item} priority={index < 3} />
				) : (
					<CaseStudyCard study={item} priority={index < 3} />
				);
			}
			if (isService(item)) {
				return <ServiceCard service={item} />;
			}
			return null;
		})();

		return (
			<div key={item.id} className={isFeatured ? "col-span-full" : ""}>
				{card}
			</div>
		);
	};
}

// =============================================================================
// Main component
// =============================================================================

export async function ContentFetcher({
	contentType,
	itemsPerRow = "3",
	limit = 6,
	sortBy = "newest",
	featuredOnly = false,
	showFilters = false,
	showSearch = false,
	paginationStyle = "none",
	searchParams = {},
	paddingTopOption,
	paddingBottomOption,
	background,
}: ContentFetcherProps) {
	try {
		const page = Number.parseInt(searchParams.page || "1", 10);
		const itemsPerPage = limit || 6;

		// Fetch filter options and content in parallel — no sequential waterfall
		const [filterOptions, contentResult] = await Promise.all([
			getFilterOptions(contentType),
			fetchContent({
				contentType,
				page,
				limit: itemsPerPage,
				sortBy: sortBy || "newest",
				searchParams,
				featuredOnly: featuredOnly || false,
				paginationStyle: paginationStyle || "none",
			}),
		]);

		const { categoryOptions, tagOptions } = filterOptions;
		const { items, totalPages, totalDocs } = contentResult;

		// Sort so featured items always appear first, preventing grid layout gaps
		const sortedItems = [...items].sort((a, b) => {
			const aFeatured =
				(isBlogPost(a) || isCaseStudy(a)) && "featured" in a && !!a.featured;
			const bFeatured =
				(isBlogPost(b) || isCaseStudy(b)) && "featured" in b && !!b.featured;
			if (aFeatured && !bFeatured) return -1;
			if (!aFeatured && bFeatured) return 1;
			return 0;
		});

		// Stable card renderer — created once, not per render
		const renderCard = createCardRenderer();

		return (
			<SectionWrapper
				className={cn(contentType !== "services" && "bg-muted/30")}
				paddingTop={paddingTopOption}
				paddingBottom={paddingBottomOption}
				background={background}
			>
				{/* Filter bar / mobile sheet */}
				<FilterSection
					categoryOptions={categoryOptions}
					tagOptions={tagOptions}
					showSearch={showSearch || false}
					showFilters={showFilters || false}
					contentType={contentType}
				/>

				{/* Content grid */}
				<ContentGrid
					items={sortedItems}
					contentType={contentType}
					itemsPerRow={itemsPerRow}
					renderCard={renderCard}
				/>

				{/* Pagination */}
				{paginationStyle === "numbered" && (
					<PaginationNumbered totalPages={totalPages} />
				)}
				{paginationStyle === "loadMore" && (
					<LoadMoreButton totalPages={totalPages} totalItems={totalDocs} />
				)}
				{paginationStyle === "infiniteScroll" && (
					<InfiniteScroll totalPages={totalPages} totalItems={totalDocs} />
				)}
			</SectionWrapper>
		);
	} catch (error) {
		console.error("ContentFetcher error:", error);
		return <ContentFetcherError />;
	}
}
