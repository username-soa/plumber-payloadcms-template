import type { Block } from "payload";

export const ContentFetcherBlock: Block = {
	slug: "contentFetcher",
	labels: {
		singular: "Content Fetcher",
		plural: "Content Fetchers",
	},
	fields: [
		// Content Settings
		{
			type: "collapsible",
			label: "Content Settings",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "contentType",
							type: "select",
							label: "Content Type",
							required: true,
							defaultValue: "blogs",
							options: [
								{ label: "Blog Posts", value: "blogs" },
								{ label: "Case Studies", value: "case-studies" },
								{ label: "Services", value: "services" },
							],
							admin: {
								width: "50%",
							},
						},
						{
							name: "limit",
							type: "number",
							label: "Items to Display",
							defaultValue: 6,
							min: 1,
							max: 24,
							admin: {
								width: "50%",
							},
						},
					],
				},
				{
					type: "row",
					fields: [
						{
							name: "itemsPerRow",
							type: "select",
							label: "Items Per Row (Desktop)",
							defaultValue: "3",
							options: [
								{ label: "1 Column", value: "1" },
								{ label: "2 Columns", value: "2" },
								{ label: "3 Columns", value: "3" },
								{ label: "4 Columns", value: "4" },
							],
							admin: {
								width: "50%",
							},
						},
						{
							name: "sortBy",
							type: "select",
							label: "Sort By",
							defaultValue: "newest",
							options: [
								{ label: "Newest First", value: "newest" },
								{ label: "Oldest First", value: "oldest" },
								{ label: "Title (A-Z)", value: "titleAsc" },
								{ label: "Title (Z-A)", value: "titleDesc" },
							],
							admin: {
								width: "50%",
							},
						},
					],
				},
				{
					name: "featuredOnly",
					type: "checkbox",
					label: "Show Featured Items Only",
					defaultValue: false,
					admin: {
						condition: (_, siblingData) =>
							siblingData?.contentType !== "services",
						description: "Only display items marked as featured",
					},
				},
			],
		},
		// Filters & Pagination
		{
			type: "collapsible",
			label: "Filters & Pagination",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "showFilters",
					type: "checkbox",
					label: "Enable Filters",
					defaultValue: false,
					admin: {
						description:
							"Allow visitors to filter content by category, search, etc.",
					},
				},
				{
					name: "showSearch",
					type: "checkbox",
					label: "Show Search",
					defaultValue: false,
					admin: {
						condition: (_, siblingData) => siblingData?.showFilters,
						description: "Show a search input to filter by text",
					},
				},
				{
					name: "paginationStyle",
					type: "select",
					label: "Pagination Style",
					defaultValue: "none",
					options: [
						{ label: "None (Show All)", value: "none" },
						{ label: "Numbered Pages", value: "numbered" },
						{ label: "Load More Button", value: "loadMore" },
						{ label: "Infinite Scroll", value: "infiniteScroll" },
					],
				},
			],
		},
	],
};
