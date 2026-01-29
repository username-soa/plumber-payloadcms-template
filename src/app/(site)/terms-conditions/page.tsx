"use client";

import { SITE_CONFIG } from "@/lib/site-config";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { FileText, Mail, Phone, MapPin, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function TermsConditionsPage() {
	const { brand, contact, legal } = SITE_CONFIG;
	const { businessDetails, jurisdiction, policies } = legal;

	return (
		<main className="min-h-screen bg-background">
			{/* Header */}
			<section className="bg-muted/50 border-b">
				<div className="container mx-auto px-4 py-16 md:py-24">
					<div className="max-w-3xl mx-auto text-center mt-14">
						<Badge variant="outline" className="mb-4 gap-2">
							<FileText className="w-4 h-4" />
							Legal Document
						</Badge>
						<TypographyH1 className="text-4xl md:text-5xl font-bold mb-4">
							Terms & Conditions
						</TypographyH1>
						<TypographyP className="text-lg text-muted-foreground mt-0">
							Terms of service for {brand.name} plumbing services
						</TypographyP>
						<TypographyP className="text-sm text-muted-foreground mt-4">
							Last updated: {legal.lastUpdated}
						</TypographyP>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="container mx-auto px-4 py-12 md:py-16">
				<div className="max-w-3xl mx-auto space-y-8">
					{/* Important Notice for Template - Only shown in development */}
					{process.env.NODE_ENV === "development" && (
						<Alert
							variant="destructive"
							className="border-orange-500 bg-orange-50 dark:bg-orange-950/20"
						>
							<AlertTriangle className="h-5 w-5 text-orange-600" />
							<AlertTitle className="text-orange-800 dark:text-orange-400">
								Template Notice - Remove Before Publishing
							</AlertTitle>
							<AlertDescription className="text-orange-700 dark:text-orange-300">
								These terms & conditions are a template only. You must customize
								all placeholder values in site-config.ts and have this document
								reviewed by a qualified Australian lawyer before publishing.
							</AlertDescription>
						</Alert>
					)}

					{/* Agreement */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">1. Agreement</h2>
							<p>
								These Terms and Conditions ("Terms") govern your use of plumbing
								services provided by {businessDetails.registeredName}{" "}
								{businessDetails.tradingAs &&
									businessDetails.tradingAs !==
										businessDetails.registeredName &&
									`(trading as ${businessDetails.tradingAs})`}{" "}
								(ABN: {businessDetails.abn}), licensed under{" "}
								{jurisdiction.state} plumbing license number{" "}
								{businessDetails.licenseNumber} ("we", "us", "our").
							</p>
							<p>
								By requesting or accepting our services, you ("Customer", "you")
								agree to be bound by these Terms.
							</p>
						</CardContent>
					</Card>

					{/* Services */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">2. Our Services</h2>
							<p>
								We provide professional plumbing services including but not
								limited to:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Emergency plumbing repairs</li>
								<li>Leak detection and repair</li>
								<li>Drain cleaning and unblocking</li>
								<li>Hot water system installation and repair</li>
								<li>Pipe repair and replacement</li>
								<li>Bathroom and kitchen plumbing</li>
								<li>Gas fitting services (where licensed)</li>
								<li>Commercial plumbing</li>
							</ul>
							<p className="mt-4">
								All work is performed by licensed plumbers in accordance with
								the Plumbing Code of Australia and applicable{" "}
								{jurisdiction.state} regulations.
							</p>
						</CardContent>
					</Card>

					{/* Quotes and Pricing */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">3. Quotes & Pricing</h2>
							<h3 className="text-lg font-semibold mt-4">Quotations</h3>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									Quotes are provided based on information available at the time
									of inspection
								</li>
								<li>Quotes are valid for 30 days unless otherwise stated</li>
								<li>
									Written quotes are fixed price for the scope described;
									additional work requires separate quotation
								</li>
							</ul>
							<h3 className="text-lg font-semibold mt-4">Price Variations</h3>
							<p>
								If unforeseen circumstances require additional work (e.g.,
								hidden damage, asbestos, access issues), we will:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Stop work and notify you immediately</li>
								<li>Provide a revised quote for the additional scope</li>
								<li>Proceed only with your written or verbal approval</li>
							</ul>
							{policies.depositPercentage > 0 && (
								<>
									<h3 className="text-lg font-semibold mt-4">Deposits</h3>
									<p>
										For jobs over $1,000, a deposit of{" "}
										{policies.depositPercentage}% may be required before work
										commences.
									</p>
								</>
							)}
						</CardContent>
					</Card>

					{/* Payment */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									Payment is due upon completion of work unless otherwise agreed
									in writing
								</li>
								<li>
									For commercial clients: payment within{" "}
									{policies.paymentTermsDays} days of invoice
								</li>
								<li>We accept cash, card, bank transfer, and EFTPOS</li>
								<li>
									Late payments may incur interest at the rate permitted by law
								</li>
								<li>
									We reserve the right to suspend services for overdue accounts
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Scheduling and Cancellation */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								5. Scheduling & Cancellation
							</h2>
							<h3 className="text-lg font-semibold mt-4">Appointments</h3>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									We provide estimated arrival windows and will notify you of
									delays
								</li>
								<li>
									An adult (18+) with authority to approve work must be present
								</li>
								<li>Clear access to the work area must be provided</li>
							</ul>
							<h3 className="text-lg font-semibold mt-4">Cancellation</h3>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									Please provide at least {policies.cancellationNoticeHours}{" "}
									hours' notice to cancel or reschedule
								</li>
								<li>Cancellations with less notice may incur a call-out fee</li>
								<li>
									If we cannot access the property as scheduled, a call-out fee
									may apply
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Warranty */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">6. Warranty</h2>
							<h3 className="text-lg font-semibold mt-4">
								Workmanship Warranty
							</h3>
							<p>
								All labour and workmanship is warranted for{" "}
								{policies.warrantyPeriodMonths} months from the date of
								completion. If a defect arises due to our workmanship, we will
								rectify it at no additional cost.
							</p>
							<h3 className="text-lg font-semibold mt-4">Product Warranties</h3>
							<p>
								Products and materials supplied carry the manufacturer's
								warranty. We will assist you in making warranty claims where
								applicable.
							</p>
							<h3 className="text-lg font-semibold mt-4">Exclusions</h3>
							<p>Warranty does not cover:</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Damage caused by misuse, neglect, or third parties</li>
								<li>Normal wear and tear</li>
								<li>Pre-existing conditions not disclosed to us</li>
								<li>Issues caused by water quality or pressure problems</li>
								<li>Work performed by others after our service</li>
							</ul>
						</CardContent>
					</Card>

					{/* Australian Consumer Law */}
					<Card className="border-primary/30 bg-primary/5">
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								7. Australian Consumer Law
							</h2>
							<p>
								Our services come with guarantees that cannot be excluded under
								the Australian Consumer Law. For major failures with the
								service, you are entitled to:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Cancel your service contract with us</li>
								<li>Receive a refund for the unused portion</li>
								<li>
									Seek compensation for any other reasonably foreseeable loss or
									damage
								</li>
							</ul>
							<p className="mt-4">
								If the failure does not amount to a major failure, you are
								entitled to have problems with the service rectified in a
								reasonable time.
							</p>
						</CardContent>
					</Card>

					{/* Liability */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								8. Liability & Insurance
							</h2>
							<h3 className="text-lg font-semibold mt-4">Our Insurance</h3>
							<p>
								We maintain comprehensive public liability insurance and
								professional indemnity insurance. Certificates of currency are
								available upon request.
							</p>
							<h3 className="text-lg font-semibold mt-4">
								Limitation of Liability
							</h3>
							<p>
								To the extent permitted by law and subject to the guarantees
								under Australian Consumer Law:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									We are not liable for pre-existing defects discovered during
									work
								</li>
								<li>
									We are not liable for damage to concealed pipes, cables, or
									structures not reasonably detectable
								</li>
								<li>
									Our total liability is limited to the value of the services
									provided
								</li>
							</ul>
							<h3 className="text-lg font-semibold mt-4">Your Obligations</h3>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									Provide accurate information about the property and issue
								</li>
								<li>
									Disclose known hazards (asbestos, electrical, structural)
								</li>
								<li>Ensure safe access to the work area</li>
							</ul>
						</CardContent>
					</Card>

					{/* Disputes */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">9. Disputes</h2>
							<p>
								If you have a complaint about our services, please contact us
								first. We will endeavour to resolve the matter fairly and
								promptly.
							</p>
							<p className="mt-4">
								If we cannot resolve the dispute, you may refer the matter to:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>{jurisdiction.state} Fair Trading / Consumer Affairs</li>
								<li>The relevant state plumbing regulator</li>
								<li>
									A dispute resolution service such as a small claims tribunal
								</li>
							</ul>
							<p className="mt-4">
								These Terms are governed by the laws of {jurisdiction.state},
								Australia. Any legal proceedings must be brought in courts
								within {jurisdiction.state}.
							</p>
						</CardContent>
					</Card>

					{/* General */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">10. General</h2>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									<strong>Entire Agreement:</strong> These Terms, together with
									any written quote, constitute the entire agreement between us
								</li>
								<li>
									<strong>Amendments:</strong> We may update these Terms from
									time to time. Current Terms will be available on our website
								</li>
								<li>
									<strong>Severability:</strong> If any provision is found to be
									invalid, the remaining provisions continue in full force
								</li>
								<li>
									<strong>Waiver:</strong> Failure to enforce any right does not
									constitute a waiver
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Contact */}
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="pt-6">
							<h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
							<p className="text-muted-foreground mb-6">
								For questions about these Terms or to make a complaint:
							</p>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="flex items-start gap-3">
									<Mail className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Complaints</p>
										<a
											href={`mailto:${legal.contact.complaintsEmail}`}
											className="text-sm text-primary hover:underline"
										>
											{legal.contact.complaintsEmail}
										</a>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Phone className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Phone</p>
										<a
											href={`tel:${contact.phone}`}
											className="text-sm text-primary hover:underline"
										>
											{contact.phone}
										</a>
									</div>
								</div>
								<div className="flex items-start gap-3 sm:col-span-2">
									<MapPin className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">
											{businessDetails.registeredName}
										</p>
										<p className="text-sm text-muted-foreground">
											ABN: {businessDetails.abn} | License:{" "}
											{businessDetails.licenseNumber} ({jurisdiction.stateShort}
											)
										</p>
										<p className="text-sm text-muted-foreground">
											{contact.address}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Links */}
					<div className="text-center pt-4 space-y-2">
						<Link
							href="/privacy-policy"
							className="text-primary hover:underline text-sm block"
						>
							View Privacy Policy
						</Link>
						<Link
							href="/"
							className="text-muted-foreground hover:underline text-sm block"
						>
							← Back to Home
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
