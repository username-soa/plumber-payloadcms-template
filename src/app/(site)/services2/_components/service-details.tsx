"use client";

import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { blockConverters } from "@/components/richtext/block-converters";

interface SubService {
	title: string;
	description: string;
	icon: string;
	slug?: string;
}

interface ServiceDetailsProps {
	title: string;
	longDescription: string | any;
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
			<div className="container mx-auto px-6 md:space-y-20 space-y-10">
				{/* Two column layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Left: Rich Description */}
					<div className="grid gap-2">
						<div>
							<span className="text-primary font-semibold text-sm uppercase tracking-wider">
								About This Service
							</span>
						</div>

						<div className="prose prose-lg dark:prose-invert max-w-none">
							{typeof longDescription === "string" ? (
								<p className="text-muted-foreground leading-relaxed">
									{longDescription}
								</p>
							) : (
								<RichText data={longDescription} converters={blockConverters} />
							)}
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
										// const Icon =
										// 	(Icons as unknown as Record<string, LucideIcon>)[
										// 		step.icon
										// 	] || Icons.CheckCircle;
										return (
											<div key={step.title} className="flex gap-4">
												<div className="shrink-0 mt-1">
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
					{image && (
						// lg:w-[80%]
						<div className="relative h-full  w-full max-lg:aspect-square mx-auto overflow-hidden rounded-2xl shadow-xl">
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
				</div>
				{subServices && subServices.length > 0 && (
					<div className="space-y-6">
						<div>
							<span className="text-primary font-semibold text-sm uppercase tracking-wider">
								What's Included
							</span>
							<h3 className="text-2xl font-bold mt-2">Our {title} Services</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&>a]:border-b [&>a:last-child]:border-b-0 md:[&>a]:border-r md:[&>a:nth-child(2n)]:border-r-0 md:[&>a:nth-last-child(-n+2)]:border-b-0 lg:[&>a:nth-child(2n)]:border-r lg:[&>a:nth-child(3n)]:border-r-0! lg:[&>a:nth-last-child(-n+3)]:border-b-0">
							{subServices.map((subService) => {
								return (
									<Link
										key={subService.title}
										href={`/services/${subService.slug}`}
										className="group flex flex-col h-full p-8 transition-all duration-300 hover:bg-muted/50 bg-background"
									>
										<div className="mb-3">
											<div className="md:size-10 size-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 bg-background">
												<DynamicIcon
													name={subService.icon}
													className="md:size-5 size-4"
												/>
											</div>
										</div>

										<TypographyH2 className="text-2xl font-semibold mb-2 text-foreground border-none">
											{subService.title}
										</TypographyH2>
										<TypographyMuted className="text-base line-clamp-3">
											{subService.description}
										</TypographyMuted>
									</Link>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
