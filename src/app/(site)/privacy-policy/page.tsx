"use client";

import { SITE_CONFIG } from "@/lib/site-config";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Shield, Mail, Phone, MapPin, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
	const { brand, contact, legal } = SITE_CONFIG;
	const { businessDetails, jurisdiction, policies } = legal;

	return (
		<main className="min-h-screen bg-background">
			{/* Header */}
			<section className="bg-muted/50 border-b">
				<div className="container mx-auto px-4 py-16 md:py-24">
					<div className="max-w-3xl mx-auto text-center mt-14">
						<Badge variant="outline" className="mb-4 gap-2">
							<Shield className="w-4 h-4" />
							Legal Document
						</Badge>
						<TypographyH1 className="text-4xl md:text-5xl font-bold mb-4">
							Privacy Policy
						</TypographyH1>
						<TypographyP className="text-lg text-muted-foreground mt-0">
							How {brand.name} collects, uses, and protects your personal
							information
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
								This privacy policy is a template only. You must customize all
								placeholder values in site-config.ts and have this document
								reviewed by a qualified Australian lawyer before publishing.
							</AlertDescription>
						</Alert>
					)}

					{/* Introduction */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
							<p>
								{businessDetails.registeredName}{" "}
								{businessDetails.tradingAs &&
									businessDetails.tradingAs !==
										businessDetails.registeredName &&
									`(trading as ${businessDetails.tradingAs})`}{" "}
								(ABN: {businessDetails.abn}) ("we", "us", "our") is committed to
								protecting your privacy in accordance with the Privacy Act 1988
								(Cth) and the Australian Privacy Principles (APPs).
							</p>
							<p>
								This Privacy Policy explains how we collect, use, disclose, and
								handle your personal information in connection with our plumbing
								services.
							</p>
						</CardContent>
					</Card>

					{/* Information We Collect */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								2. Information We Collect
							</h2>
							<p>We may collect the following types of personal information:</p>
							<h3 className="text-lg font-semibold mt-4">
								Information you provide directly:
							</h3>
							<ul className="list-disc pl-6 space-y-1">
								<li>Name and contact details (phone, email, address)</li>
								<li>Property address and type (residential/commercial)</li>
								<li>Details about your plumbing issue or service request</li>
								<li>Preferred contact times and appointment preferences</li>
								<li>Payment information for completed services</li>
							</ul>
							<h3 className="text-lg font-semibold mt-4">
								Information collected automatically:
							</h3>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									Website usage data (pages visited, time spent, browser type)
								</li>
								<li>IP address and general location information</li>
								<li>Device information</li>
							</ul>
						</CardContent>
					</Card>

					{/* How We Use Your Information */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								3. How We Use Your Information
							</h2>
							<p>We use your personal information to:</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Respond to your enquiries and service requests</li>
								<li>Schedule and perform plumbing services</li>
								<li>Provide quotes and process payments</li>
								<li>
									Communicate about your service (confirmations, reminders)
								</li>
								<li>Maintain records for warranty and compliance purposes</li>
								<li>Improve our services and customer experience</li>
								<li>
									Comply with legal obligations (licensing, tax, safety records)
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Disclosure */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								4. Disclosure of Your Information
							</h2>
							<p>
								We do not sell your personal information. We may share your
								information with:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Our employees and contractors performing services</li>
								<li>
									Subcontractors engaged to assist with your job (with your
									knowledge)
								</li>
								<li>Payment processors for transaction processing</li>
								<li>Professional advisers (accountants, lawyers, insurers)</li>
								<li>
									Government and regulatory authorities where required by law
								</li>
								<li>
									Third-party software providers (scheduling, email) who are
									bound by confidentiality
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Data Security */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
							<p>
								We take reasonable steps to protect your personal information
								from misuse, interference, loss, and unauthorised access or
								disclosure. This includes:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>Secure storage of physical and electronic records</li>
								<li>Password protection and access controls</li>
								<li>Secure transmission of data (SSL/TLS encryption)</li>
								<li>Staff training on privacy obligations</li>
							</ul>
						</CardContent>
					</Card>

					{/* Data Retention */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
							<p>
								We retain your personal information for{" "}
								{policies.dataRetentionYears} years from your last interaction
								with us, or as required by law for compliance, tax, and warranty
								purposes. After this period, your information will be securely
								destroyed or de-identified.
							</p>
						</CardContent>
					</Card>

					{/* Your Rights */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
							<p>Under the Privacy Act, you have the right to:</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									<strong>Access</strong> — Request a copy of the personal
									information we hold about you
								</li>
								<li>
									<strong>Correction</strong> — Request correction of inaccurate
									or out-of-date information
								</li>
								<li>
									<strong>Opt-out</strong> — Unsubscribe from marketing
									communications at any time
								</li>
								<li>
									<strong>Complain</strong> — Lodge a complaint if you believe
									we have breached your privacy
								</li>
							</ul>
							<p className="mt-4">
								To exercise these rights, contact our Privacy Officer using the
								details below. We will respond within 30 days.
							</p>
						</CardContent>
					</Card>

					{/* Cookies */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								8. Cookies & Website Tracking
							</h2>
							<p>
								Our website may use cookies and similar technologies to enhance
								your experience. These may include:
							</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>
									<strong>Essential cookies</strong> — Required for website
									functionality
								</li>
								<li>
									<strong>Analytics cookies</strong> — Help us understand how
									visitors use our site
								</li>
							</ul>
							<p className="mt-4">
								You can control cookies through your browser settings. Disabling
								cookies may affect website functionality.
							</p>
						</CardContent>
					</Card>

					{/* Changes */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">
								9. Changes to This Policy
							</h2>
							<p>
								We may update this Privacy Policy from time to time. Changes
								will be posted on this page with an updated "Last updated" date.
								We encourage you to review this policy periodically.
							</p>
						</CardContent>
					</Card>

					{/* Complaints */}
					<Card>
						<CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
							<h2 className="text-2xl font-bold mb-4">10. Complaints</h2>
							<p>
								If you believe we have breached the Australian Privacy
								Principles, please contact our Privacy Officer. We will
								investigate your complaint and respond within 30 days.
							</p>
							<p className="mt-4">
								If you are not satisfied with our response, you may lodge a
								complaint with the Office of the Australian Information
								Commissioner (OAIC):
							</p>
							<ul className="list-none pl-0 mt-2 space-y-1">
								<li>
									<strong>Website:</strong>{" "}
									<a
										href="https://www.oaic.gov.au"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline"
									>
										www.oaic.gov.au
									</a>
								</li>
								<li>
									<strong>Phone:</strong> 1300 363 992
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Contact */}
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="pt-6">
							<h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
							<p className="text-muted-foreground mb-6">
								For privacy-related enquiries, please contact:
							</p>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="flex items-start gap-3">
									<Mail className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Privacy Officer</p>
										<p className="text-sm text-muted-foreground">
											{legal.contact.privacyOfficer}
										</p>
										<a
											href={`mailto:${legal.contact.privacyEmail}`}
											className="text-sm text-primary hover:underline"
										>
											{legal.contact.privacyEmail}
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
											ABN: {businessDetails.abn}
										</p>
										<p className="text-sm text-muted-foreground">
											{contact.address}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Back Link */}
					<div className="text-center pt-4">
						<Link href="/" className="text-primary hover:underline text-sm">
							← Back to Home
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
