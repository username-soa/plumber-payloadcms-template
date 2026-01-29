"use client";

import { cn } from "@/lib/utils";
import {
	Table as ShadcnTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface TableProps {
	caption?: string;
	headers: string[];
	rows: string[][];
	striped?: boolean;
	bordered?: boolean;
	className?: string;
}

export function Table({
	caption,
	headers,
	rows,
	striped = true,
	bordered = true,
	className,
}: TableProps) {
	if (!headers?.length) return null;

	return (
		<div className={cn("my-8 not-prose", className)}>
			<div
				className={cn(
					bordered &&
						"border border-border shadow-sm rounded-xl overflow-hidden",
				)}
			>
				<ShadcnTable>
					<TableHeader>
						<TableRow className="bg-muted/60 hover:bg-muted/60 border-b-2 border-border">
							{headers.map((header, index) => (
								<TableHead
									key={`header-${index}-${header}`}
									className={cn(
										"py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground",
										bordered &&
											index !== headers.length - 1 &&
											"border-r border-border/40",
									)}
								>
									{header}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row, rowIndex) => (
							<TableRow
								key={`row-${rowIndex}-${row.join("-")}`}
								className={cn(
									"transition-all duration-150",
									striped && rowIndex % 2 === 1 && "bg-muted/20",
									"hover:bg-primary/5",
								)}
							>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={`cell-${rowIndex}-${cellIndex}-${cell}`}
										className={cn(
											"py-3.5 px-4 text-sm text-foreground",
											bordered &&
												cellIndex !== row.length - 1 &&
												"border-r border-border/40",
											cellIndex === 0 && "font-medium",
										)}
									>
										{cell}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</ShadcnTable>
			</div>
			{caption && (
				<p className="mt-4 text-center text-sm font-medium capitalize text-foreground/50">
					{caption}.
				</p>
			)}
		</div>
	);
}
