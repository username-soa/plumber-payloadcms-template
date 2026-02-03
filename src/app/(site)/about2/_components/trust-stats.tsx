"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH2 } from "@/components/ui/typography";

function AnimatedStat({ value, label }: { value: string; label: string }) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`text-center transition-all duration-700 ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
			}`}
		>
			<div className="text-4xl md:text-5xl font-bold text-primary mb-2">
				{value}
			</div>
			<div className="text-muted-foreground font-medium">{label}</div>
		</div>
	);
}

export function TrustStats() {
	const { trustStats } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<span className="uppercase tracking-wider text-sm">
							By The Numbers
						</span>
					</div>
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight">
						Trusted by Thousands of{" "}
						<span className="text-primary">Water City</span> Residents
					</TypographyH2>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
					{trustStats.map((stat, index) => (
						<div
							key={stat.label}
							style={{ transitionDelay: `${index * 100}ms` }}
						>
							<AnimatedStat value={stat.value} label={stat.label} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
