import React from "react";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

interface CertificationsBlockProps {
	id?: string | null;
	title?: string | null;
	titleHighlight?: string | null;
	subtitle?: string | null;
	description?: string | null;
	certifications?:
		| {
				name: string;
				description?: string | null;
				icon?: string | null;
				id?: string | null;
		  }[]
		| null;
}

export function Certifications({
	title,
	titleHighlight,
	subtitle,
	description,
	certifications,
}: CertificationsBlockProps) {
	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					{subtitle && (
						<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
							<span className="uppercase tracking-wider text-sm">{subtitle}</span>
						</div>
					)}
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
						{title}
						{titleHighlight && (
							<span className="text-primary">{titleHighlight}</span>
						)}
					</TypographyH2>
					{description && (
						<TypographyMuted className="text-base">
							{description}
						</TypographyMuted>
					)}
				</div>

				{certifications && certifications.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{certifications.map((cert, index) => {
							return (
								<div
									key={cert.id || index}
									className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl border hover:border-primary/50 transition-colors"
								>
									<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
										<DynamicIcon
											name={cert.icon || "ShieldCheck"}
											className="w-6 h-6 text-primary"
										/>
									</div>
									<div>
										<h3 className="font-semibold mb-1">{cert.name}</h3>
										{cert.description && (
											<p className="text-sm text-muted-foreground">
												{cert.description}
											</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
