"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypographyH2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface SubService {
	title: string;
	description: string;
	icon: string;
}

interface ServiceDetailsProps {
	title: string;
	longDescription: string;
	subServices?: SubService[];
	process?: { title: string; description: string; icon: string }[];
	image?: string;
}

export function ServiceDetails({
	title,
	longDescription,
	subServices,
	process,
	image,
}: ServiceDetailsProps) {
	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-6">
				{/* Two column layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Left: Rich Description */}
					<div className="space-y-6">
						<div>
							<span className="text-primary font-semibold text-sm uppercase tracking-wider">
								About This Service
							</span>
							<TypographyH2 className="mt-2">
								Professional {title} in{" "}
								{SITE_CONFIG.contact.address.split(",").pop()?.trim() ||
									"Your Area"}
							</TypographyH2>
						</div>

						<div className="prose prose-lg max-w-none">
							<p className="text-muted-foreground text-lg leading-relaxed">
								{longDescription}
							</p>
							<p className="text-muted-foreground leading-relaxed">
								At {SITE_CONFIG.brand.name}, we bring years of experience and
								the latest technology to every job. Our licensed technicians are
								available for same-day appointments and provide upfront pricing
								with no hidden fees.
							</p>
						</div>

						{/* Trust Points */}
						<div className="flex flex-wrap gap-4 pt-4">
							{[
								{ icon: "ShieldCheck", text: "Licensed & Insured" },
								{ icon: "Clock", text: "Same-Day Service" },
								{ icon: "BadgeDollarSign", text: "Upfront Pricing" },
							].map((item) => {
								const Icon =
									(Icons as unknown as Record<string, LucideIcon>)[item.icon] ||
									Icons.Check;
								return (
									<div
										key={item.text}
										className="flex items-center gap-2 text-sm font-medium"
									>
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											<Icon className="w-4 h-4 text-primary" />
										</div>
										<span>{item.text}</span>
									</div>
								);
							})}
						</div>

						{/* Service Process Steps */}
						{process && process.length > 0 && (
							<div className="pt-4 mt-4">
								<span className="text-primary font-semibold text-sm uppercase tracking-wider block mb-4">
									Service Workflow
								</span>
								<div className="space-y-6 md:ml-4">
									{process.map((step, index) => {
										const Icon =
											(Icons as unknown as Record<string, LucideIcon>)[
												step.icon
											] || Icons.CheckCircle;
										return (
											<div key={step.title} className="flex gap-4">
												<div className="flex-shrink-0 mt-1">
													<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
														{index + 1}
													</div>
												</div>
												<div>
													<h3 className="font-semibold text-foreground flex items-center gap-2">
														{step.title}
													</h3>
													<p className="text-sm text-muted-foreground mt-1">
														{step.description}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>

					{/* Right: Image and Sub-services Grid */}
					<div className="space-y-8">
						{image && (
							<div className="relative h-full md:w-[80%] w-full max-md:aspect-square mx-auto overflow-hidden rounded-2xl shadow-xl">
								<Image
									src={image}
									alt={`${title} service`}
									fill
									priority
									sizes="(max-width: 1024px) 80vw, 40vw"
									className="object-cover hover:scale-105 transition-transform duration-700"
								/>
							</div>
						)}

						{subServices && subServices.length > 0 && (
							<div className="space-y-6">
								<div>
									<span className="text-primary font-semibold text-sm uppercase tracking-wider">
										What's Included
									</span>
									<h3 className="text-2xl font-bold mt-2">
										Our {title} Services
									</h3>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{subServices.map((subService) => {
										const Icon =
											(Icons as unknown as Record<string, LucideIcon>)[
												subService.icon
											] || Icons.Wrench;
										return (
											<div
												key={subService.title}
												className={cn(
													"group p-5 rounded-2xl border border-border bg-card",
													"hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
													"transition-all duration-300 ml-0",
												)}
											>
												<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
													<Icon className="w-6 h-6" />
												</div>
												<h4 className="font-semibold text-lg mb-2">
													{subService.title}
												</h4>
												<p className="text-muted-foreground text-sm leading-relaxed">
													{subService.description}
												</p>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
