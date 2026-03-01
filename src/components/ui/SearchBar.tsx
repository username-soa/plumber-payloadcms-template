/**
 * SearchBar Component
 *
 * A fully accessible, debounced search input that queries the Payload search
 * plugin via `/api/search` and displays grouped results in a dropdown.
 *
 * Features:
 * - 300 ms debounce to minimise API calls
 * - Results grouped by content type with icons and colour coding
 * - Keyboard navigation: Escape closes the dropdown
 * - Click-outside detection closes the dropdown
 * - Full ARIA combobox pattern (role, aria-expanded, aria-controls)
 * - Loading spinner and clear button in the input suffix
 *
 * Props:
 * @prop className   - Additional CSS classes for the wrapper element
 * @prop placeholder - Input placeholder text
 * @prop filterType  - When set, only results from this collection are shown
 */

"use client";

import {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useId,
} from "react";
import {
	Search,
	X,
	FileText,
	Wrench,
	BookOpen,
	HelpCircle,
	Loader2,
} from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";
import type { SearchFilterType } from "@/lib/content/search-type-map";

// =============================================================================
// Types
// =============================================================================

interface SearchResult {
	id: string;
	title: string;
	excerpt: string;
	type: string;
	url: string;
}

// =============================================================================
// Type config — maps a collection slug to its display label, icon, and colour
// =============================================================================

const TYPE_CONFIG: Record<
	string,
	{ label: string; icon: React.ReactNode; color: string }
> = {
	"blog-posts": {
		label: "Blog",
		icon: <BookOpen className="w-3.5 h-3.5" />,
		color: "text-blue-500",
	},
	services: {
		label: "Service",
		icon: <Wrench className="w-3.5 h-3.5" />,
		color: "text-primary",
	},
	"case-studies": {
		label: "Case Study",
		icon: <FileText className="w-3.5 h-3.5" />,
		color: "text-emerald-500",
	},
	faqs: {
		label: "FAQ",
		icon: <HelpCircle className="w-3.5 h-3.5" />,
		color: "text-amber-500",
	},
} as const;

// =============================================================================
// Props
// =============================================================================

interface SearchBarProps {
	/** Additional CSS classes for the wrapper */
	className?: string;
	/** Placeholder text for the input */
	placeholder?: string;
	/** When set, only results from this collection type are shown */
	filterType?: SearchFilterType;
}

// =============================================================================
// Component
// =============================================================================

export function SearchBar({
	className = "",
	placeholder = "Search services, blog posts, FAQs…",
	filterType,
}: SearchBarProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// Stable IDs for ARIA combobox linkage (React 18+ useId)
	const listboxId = useId();

	const debouncedQuery = useDebounce(query, 300);
	const inputRef = useRef<HTMLInputElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	// ---------------------------------------------------------------------------
	// Data fetching
	// ---------------------------------------------------------------------------

	const fetchResults = useCallback(
		async (q: string) => {
			// Require at least 2 characters to trigger a search
			if (q.length < 2) {
				setResults([]);
				setIsOpen(false);
				return;
			}

			setIsLoading(true);
			try {
				// Build the URL — pass filterType as a server-side param so the
				// DB query only returns results from the requested collection
				const url = new URL("/api/search", window.location.origin);
				url.searchParams.set("q", q);
				if (filterType) url.searchParams.set("type", filterType);

				const res = await fetch(url);
				const data = await res.json();
				setResults(data.results ?? []);
				setIsOpen(true);
			} catch {
				// Silently clear results on network errors
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		},
		[filterType],
	);

	// Trigger fetch whenever the debounced query changes
	useEffect(() => {
		fetchResults(debouncedQuery);
	}, [debouncedQuery, fetchResults]);

	// ---------------------------------------------------------------------------
	// Event listeners — merged into a single effect to reduce overhead
	// ---------------------------------------------------------------------------

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setIsOpen(false);
				inputRef.current?.blur();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// ---------------------------------------------------------------------------
	// Handlers
	// ---------------------------------------------------------------------------

	/** Clears the search input and closes the dropdown */
	const clearSearch = useCallback(() => {
		setQuery("");
		setResults([]);
		setIsOpen(false);
		inputRef.current?.focus();
	}, []);

	// ---------------------------------------------------------------------------
	// Derived state — memoised to avoid recalculation on every render
	// ---------------------------------------------------------------------------

	/** Results grouped by collection type for the dropdown sections */
	const grouped = useMemo(
		() =>
			results.reduce<Record<string, SearchResult[]>>((acc, r) => {
				if (!acc[r.type]) acc[r.type] = [];
				acc[r.type].push(r);
				return acc;
			}, {}),
		[results],
	);

	// ---------------------------------------------------------------------------
	// Render
	// ---------------------------------------------------------------------------

	return (
		<div ref={wrapperRef} className={`relative w-full max-w-md ${className}`}>
			{/* ── Input ─────────────────────────────────────────────────────────── */}
			<div className="relative flex items-center">
				<Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
				<input
					ref={inputRef}
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => results.length > 0 && setIsOpen(true)}
					placeholder={placeholder}
					className="w-full h-10 pl-9 pr-9 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
					aria-label="Search"
					aria-expanded={isOpen}
					aria-autocomplete="list"
					aria-controls={listboxId}
					role="combobox"
				/>
				{/* Right icon: spinner while loading, clear button when there is a query */}
				<div className="absolute right-3">
					{isLoading ? (
						<Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
					) : query ? (
						<button
							type="button"
							onClick={clearSearch}
							className="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Clear search"
						>
							<X className="w-4 h-4" />
						</button>
					) : null}
				</div>
			</div>

			{/* ── Dropdown ──────────────────────────────────────────────────────── */}
			{isOpen && (
				<div
					id={listboxId}
					className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-lg border border-border bg-background shadow-xl overflow-hidden"
					role="listbox"
				>
					{results.length === 0 && !isLoading ? (
						<div className="px-4 py-6 text-center text-sm text-muted-foreground">
							No results found for &ldquo;{query}&rdquo;
						</div>
					) : (
						<div className="max-h-[400px] overflow-y-auto divide-y divide-border">
							{Object.entries(grouped).map(([type, items]) => {
								const config = TYPE_CONFIG[type];
								return (
									<div key={type}>
										{/* Group header */}
										<div className="px-3 py-1.5 flex items-center gap-1.5 bg-muted/40">
											<span
												className={config?.color ?? "text-muted-foreground"}
											>
												{config?.icon}
											</span>
											<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
												{config?.label ?? type}
											</span>
										</div>

										{/* Result items */}
										{items.map((result) => (
											<Link
												key={result.id}
												href={result.url}
												onClick={() => {
													setIsOpen(false);
													setQuery("");
												}}
												className="flex flex-col px-4 py-3 hover:bg-muted/50 transition-colors group"
												role="option"
												aria-selected={false}
											>
												<span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
													{result.title}
												</span>
												{result.excerpt && (
													<span className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
														{result.excerpt}
													</span>
												)}
											</Link>
										))}
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
