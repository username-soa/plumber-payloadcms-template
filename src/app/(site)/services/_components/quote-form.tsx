"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuoteFormCTAProps {
	serviceName: string;
}

export function QuoteFormCTA({ serviceName }: QuoteFormCTAProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	return (
		<section className="py-16 md:py-24 bg-linear-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
						backgroundSize: "40px 40px",
					}}
				/>
			</div>
			<div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
			<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

			<div className="container mx-auto px-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left: Content */}
					<div className="space-y-8">
						<div>
							<span className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm font-medium mb-4">
								Free Quote
							</span>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
								Get Your Free {serviceName} Quote Today
							</h2>
							<p className="text-primary-foreground text-lg mt-4 max-w-lg">
								Fill out the form and one of our experts will contact you within
								30 minutes during business hours with a detailed estimate.
							</p>
						</div>

						{/* Contact Info */}
						<div className="space-y-4">
							<a
								href={`tel:${SITE_CONFIG.contact.phone}`}
								className="flex items-center gap-4 text-lg hover:text-white/90 transition-colors group"
							>
								<div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<Phone className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm text-primary-foreground">
										Call Us Now
									</div>
									<div className="font-semibold">
										{SITE_CONFIG.contact.phone}
									</div>
								</div>
							</a>
							<a
								href={`mailto:${SITE_CONFIG.contact.email}`}
								className="flex items-center gap-4 text-lg hover:text-white/90 transition-colors group"
							>
								<div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<Mail className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm text-primary-foreground">
										Email Us
									</div>
									<div className="font-semibold">
										{SITE_CONFIG.contact.email}
									</div>
								</div>
							</a>
							<div className="flex items-center gap-4 text-lg">
								<div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
									<MapPin className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm text-primary-foreground">
										Service Area
									</div>
									<div className="font-semibold">
										{SITE_CONFIG.contact.address}
									</div>
								</div>
							</div>
						</div>

						{/* Trust Badges */}
						<div className="flex flex-wrap gap-6 pt-4">
							{[
								"Licensed & Insured",
								"No Hidden Fees",
								"Satisfaction Guaranteed",
							].map((badge) => (
								<div key={badge} className="flex items-center gap-2 text-sm">
									<CheckCircle2 className="w-5 h-5 text-green-300" />
									<span>{badge}</span>
								</div>
							))}
						</div>
					</div>

					{/* Right: Form */}
					<div
						className={cn(
							"bg-background rounded-3xl md:px-8 py-8 px-6 shadow-2xl text-foreground",
							"border border-border",
						)}
					>
						{isSubmitted ? (
							<div className="text-center py-12">
								<div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
									<CheckCircle2 className="w-10 h-10 text-green-600" />
								</div>
								<h3 className="text-2xl font-bold mb-2">Thank You!</h3>
								<p className="text-muted-foreground">
									We've received your request and will contact you shortly with
									your free quote.
								</p>
							</div>
						) : (
							<>
								<div className="mb-6">
									<h3 className="text-2xl font-bold">Request a Free Quote</h3>
									<p className="text-muted-foreground mt-1">
										No obligation. Get your estimate in minutes.
									</p>
								</div>

								<form onSubmit={handleSubmit} className="space-y-5">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="name">Full Name *</Label>
											<Input
												id="name"
												name="name"
												placeholder="John Smith"
												required
												className="h-12"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">Phone Number *</Label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												placeholder="(555) 123-4567"
												required
												className="h-12"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="email">Email Address *</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="john@email.com"
											required
											className="h-12"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="service">Service Needed</Label>
										<Input
											id="service"
											name="service"
											defaultValue={serviceName}
											readOnly
											className="h-12 bg-muted/50"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">Describe Your Issue</Label>
										<Textarea
											id="message"
											name="message"
											placeholder="Please describe the problem you're experiencing..."
											rows={4}
											className="resize-none"
										/>
									</div>

									<Button
										type="submit"
										size="lg"
										className="w-full h-14 text-lg font-bold rounded-xl"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader2 className="w-5 h-5 mr-2 animate-spin" />
												Sending...
											</>
										) : (
											"Get My Free Quote"
										)}
									</Button>

									<p className="text-xs text-muted-foreground text-center">
										By submitting, you agree to our privacy policy. We'll never
										share your information.
									</p>
								</form>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
