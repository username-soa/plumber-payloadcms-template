"use client";

import { useState, useActionState, useEffect, startTransition } from "react";
import { Phone, CheckCircle2, Loader2, Mail, ArrowRight } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { UrgencySelector } from "./urgency-selector";
import { useRef } from "react";
import { toast } from "sonner";

import {
	FileUploader,
	type FilePreview,
	MAX_TOTAL_SIZE,
} from "./file-uploader";

const PROPERTY_TYPES = [
	{ id: "residential", label: "Residential" },
	{ id: "commercial", label: "Commercial" },
];

const CONTACT_TIMES = [
	{ id: "anytime", label: "Anytime" },
	{ id: "morning", label: "Morning (8am-12pm)" },
	{ id: "afternoon", label: "Afternoon (12pm-5pm)" },
	{ id: "evening", label: "Evening (5pm-7pm)" },
];

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showMailDialog, setShowMailDialog] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	// Server Action State
	const [state, action, isPending] = useActionState(submitContactForm, {
		success: false,
		message: "",
	});

	// Handle Server Action Success
	useEffect(() => {
		if (state.success) {
			toast.success("Message Sent!", {
				description:
					"Thanks for reaching out. We've received your message and will get back to you shortly.",
			});
			// Reset form
			formRef.current?.reset();
			setUrgency("");
			setService("");
			setPropertyType("residential");
			setContactTime("anytime");
			setFilePreviews([]);
		}
	}, [state.success]);

	// Form State
	const [urgency, setUrgency] = useState("");
	const [propertyType, setPropertyType] = useState("residential");
	const [service, setService] = useState("");
	const [contactTime, setContactTime] = useState("anytime");
	const [previewData, setPreviewData] = useState({
		name: "",
		phone: "",
		email: "",
		message: "",
	});
	const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
	const [fileError, setFileError] = useState<string | null>(null);

	const handleFilesSelected = (files: File[]) => {
		setFileError(null);
		const newPreviews: FilePreview[] = [];
		let currentTotalSize = filePreviews.reduce((acc, f) => acc + f.size, 0);

		for (const file of files) {
			// Check duplicate by name and size
			if (
				filePreviews.some((p) => p.name === file.name && p.size === file.size)
			) {
				continue;
			}

			if (currentTotalSize + file.size > MAX_TOTAL_SIZE) {
				setFileError("Total attachment size cannot exceed 10MB.");
				break;
			}

			currentTotalSize += file.size;

			let type: "image" | "video" | "file" = "file";
			let url: string | null = null;

			if (file.type.startsWith("image/")) {
				type = "image";
				url = URL.createObjectURL(file);
			} else if (file.type.startsWith("video/")) {
				type = "video";
			}

			newPreviews.push({
				url,
				type,
				name: file.name,
				size: file.size,
				file,
			});
		}

		setFilePreviews((prev) => [...prev, ...newPreviews]);
	};

	const removeFile = (indexToRemove: number) => {
		setFilePreviews((prev) => {
			const newPreviews = [...prev];
			const removed = newPreviews[indexToRemove];
			if (removed.url) URL.revokeObjectURL(removed.url);
			newPreviews.splice(indexToRemove, 1);
			return newPreviews;
		});
		setFileError(null);
	};

	// Clean up object URLs
	useEffect(() => {
		return () => {
			filePreviews.forEach((preview) => {
				if (preview.url) URL.revokeObjectURL(preview.url);
			});
		};
	}, [filePreviews]);

	const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);

		// Append files
		formData.delete("attachment");
		filePreviews.forEach((preview) => {
			formData.append("attachment", preview.file);
		});

		if (SITE_CONFIG.email.provider === "mailto") {
			setPreviewData({
				name: formData.get("name") as string,
				phone: formData.get("phone") as string,
				email: formData.get("email") as string,
				message: formData.get("message") as string,
			});
			setShowMailDialog(true);
		} else {
			startTransition(() => {
				action(formData);
			});
		}
	};

	const handleConfirmSend = () => {
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setShowMailDialog(false);
			toast.success("Inquiry Ready!", {
				description: `If your email client didn't open automatically, please verify that you have sent the email to ${SITE_CONFIG.email.to}.`,
			});
			// Reset form
			formRef.current?.reset();
			setUrgency("");
			setService("");
			setPropertyType("residential");
			setContactTime("anytime");
			setFilePreviews([]);
		}, 1000);
	};

	const getMailtoLink = () => {
		const subject = `Plumbing Inquiry: ${service || "General"} - ${previewData.name}`;
		const body = `
Name: ${previewData.name}
Phone: ${previewData.phone}
Email: ${previewData.email}
Service Needed: ${service || "Not Specified"}
Urgency: ${urgency || "Not Specified"}
Property Type: ${propertyType}
Preferred Contact Time: ${contactTime}

Message:
${previewData.message}
    `.trim();

		return `mailto:${SITE_CONFIG.email.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	};

	return (
		<>
			<Card className="md:py-6 relative overflow-hidden">
				<CardContent>
					<div className="mb-6">
						<h3 className="text-2xl font-bold">Send Us a Message</h3>
						<p className="text-muted-foreground mt-1">
							Fill out the form and we'll get back to you within 30 minutes
							during business hours.
						</p>
					</div>

					<form ref={formRef} onSubmit={onFormSubmit} className="space-y-6">
						<UrgencySelector value={urgency} onValueChange={setUrgency} />

						{/* Emergency Alert */}
						{urgency === "emergency" && (
							<Alert variant="destructive">
								<Phone className="h-4 w-4" />
								<AlertDescription>
									For fastest response, call us now:{" "}
									<a
										href={`tel:${SITE_CONFIG.contact.phone}`}
										className="font-bold hover:underline"
									>
										{SITE_CONFIG.contact.phone}
									</a>
								</AlertDescription>
							</Alert>
						)}

						{/* Contact Info */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">
									Full Name <span className="text-red-700">*</span>
								</Label>
								<Input
									id="name"
									name="name"
									placeholder="John Smith"
									required
									className="h-12"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">
									Phone Number <span className="text-red-700">*</span>
								</Label>
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
							<Label htmlFor="email">
								Email Address <span className="text-red-700">*</span>
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="john@email.com"
								required
								className="h-12"
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{/* Service Type */}
							<div className="space-y-2">
								<Label htmlFor="service">
									Service Needed <span className="text-red-700">*</span>
								</Label>
								<Select value={service} onValueChange={setService} required>
									<SelectTrigger id="service" className="h-12 w-full">
										<SelectValue placeholder="Select a service..." />
									</SelectTrigger>
									<SelectContent>
										{SITE_CONFIG.services.map((svc) => (
											<SelectItem key={svc.slug} value={svc.slug}>
												{svc.title}
											</SelectItem>
										))}
										<SelectItem value="other">Other / Not Sure</SelectItem>
									</SelectContent>
								</Select>
							</div>
							{/* Preferred Contact Time */}
							<div className="space-y-2">
								<Label htmlFor="contactTime">Preferred Contact Time</Label>
								<Select value={contactTime} onValueChange={setContactTime}>
									<SelectTrigger id="contactTime" className="h-12 w-full">
										<SelectValue placeholder="Select time..." />
									</SelectTrigger>
									<SelectContent>
										{CONTACT_TIMES.map((time) => (
											<SelectItem key={time.id} value={time.id}>
												{time.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Property Type */}
						<div className="space-y-3">
							<Label className="text-base">Property Type</Label>
							<RadioGroup
								value={propertyType}
								onValueChange={setPropertyType}
								className="grid grid-cols-2 gap-4"
							>
								{PROPERTY_TYPES.map((type) => (
									<Label
										key={type.id}
										htmlFor={`property-${type.id}`}
										className={cn(
											"flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all w-full",
											propertyType === type.id
												? "bg-primary/10 border-primary"
												: "bg-muted/50 border-transparent hover:border-border",
										)}
									>
										<RadioGroupItem
											value={type.id}
											id={`property-${type.id}`}
										/>
										<span className="font-medium">{type.label}</span>
									</Label>
								))}
							</RadioGroup>
						</div>

						{/* Message */}
						<div className="space-y-2">
							<Label htmlFor="message">Describe Your Issue</Label>
							<Textarea
								id="message"
								name="message"
								placeholder="Please describe the problem you're experiencing..."
								rows={4}
								className="resize-y"
							/>
						</div>

						{/* Hidden inputs for Server Action FormData */}
						<input type="hidden" name="urgency" value={urgency} />
						<input type="hidden" name="service" value={service} />
						<input type="hidden" name="propertyType" value={propertyType} />
						<input type="hidden" name="contactTime" value={contactTime} />

						{/* Attachment (Nodemailer only) */}
						{SITE_CONFIG.email.provider === "nodemailer" && (
							<FileUploader
								filePreviews={filePreviews}
								onFilesSelected={handleFilesSelected}
								onRemoveFile={removeFile}
								error={fileError}
							/>
						)}

						{/* Submit */}
						<Button
							type="submit"
							size="lg"
							className="w-full h-14 text-lg font-bold rounded-xl"
							disabled={isSubmitting || isPending || !urgency}
						>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									Sending...
								</>
							) : (
								"Send Message"
							)}
						</Button>

						{/* Server Error Message */}
						{!state.success && state.message && (
							<p className="text-sm text-red-500 text-center font-medium">
								{state.message}
							</p>
						)}

						{/* Trust Badges */}
						<div className="flex flex-wrap justify-center gap-3 pt-2">
							{[
								"Licensed & Insured",
								"No Hidden Fees",
								"Satisfaction Guaranteed",
							].map((badge) => (
								<Badge key={badge} variant="outline" className="gap-1.5">
									<CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
									{badge}
								</Badge>
							))}
						</div>

						<p className="text-xs text-muted-foreground text-center">
							By submitting, you agree to our privacy policy. We'll never share
							your information.
						</p>
					</form>
				</CardContent>
			</Card>

			{/* Mailto Dialog */}
			<Dialog open={showMailDialog} onOpenChange={setShowMailDialog}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Send via Email Client</DialogTitle>
						<DialogDescription>
							To ensure your message reaches us directly, we'll open your
							default email app with the details you filled out.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4 py-4">
						<div className="bg-muted p-4 rounded-lg text-sm font-mono text-muted-foreground whitespace-pre-wrap max-h-[150px] overflow-y-auto">
							{`Subject: Plumbing Inquiry: ${service || "General"}\n\nName: ${previewData.name}\nPhone: ${previewData.phone}...`}
						</div>
						<Alert>
							<Mail className="h-4 w-4" />
							<AlertDescription>
								Please hit <strong>Send</strong> in your email app after
								clicking the button below.
							</AlertDescription>
						</Alert>
					</div>
					<DialogFooter className="flex-col sm:justify-between gap-2">
						<Button
							variant="outline"
							onClick={() => setShowMailDialog(false)}
							className="w-full sm:w-auto"
						>
							Cancel
						</Button>
						<Button
							asChild
							className="w-full sm:w-auto gap-2"
							onClick={handleConfirmSend}
						>
							<a href={getMailtoLink()}>
								Open Email App <ArrowRight className="h-4 w-4" />
							</a>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
