"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const article = document.querySelector(".prose");
		if (!article) return;

		const elements = article.querySelectorAll("h2, h3");
		const items: Heading[] = [];

		elements.forEach((element) => {
			const id =
				element.id ||
				element.textContent?.toLowerCase().replace(/\s+/g, "-") ||
				"";
			if (!element.id) {
				element.id = id;
			}
			items.push({
				id,
				text: element.textContent || "",
				level: element.tagName === "H2" ? 2 : 3,
			});
		});

		setHeadings(items);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "-80px 0px -80% 0px" },
		);

		headings.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav className="space-y-2">
			<h4 className="font-semibold text-sm text-foreground mb-4">
				Table of Contents
			</h4>
			<ul className="space-y-1">
				{headings.map((heading) => (
					<li key={heading.id}>
						<a
							href={`#${heading.id}`}
							className={cn(
								"block text-sm py-1 transition-colors hover:text-primary",
								heading.level === 3 && "pl-4",
								activeId === heading.id
									? "text-primary font-medium"
									: "text-muted-foreground",
							)}
							onClick={(e) => {
								e.preventDefault();
								document.getElementById(heading.id)?.scrollIntoView({
									behavior: "smooth",
								});
							}}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
