import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ContactInfo() {
	return (
		<div className="lg:space-y-6 space-y-4 container mx-auto px-6 py-16 md:py-24">
			{/* Contact Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 lg:gap-6 gap-4">
				{/* Phone Card */}
				<Card className="group hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
					<a href={`tel:${SITE_CONFIG.contact.phone}`} className="block h-full">
						<CardContent className="max-lg:px-4">
							<div className="flex flex-col items-start gap-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
									<Phone className="w-5 h-5 text-primary" />
								</div>
								<div className="flex-1">
									<Badge variant="secondary" className="mb-2 text-xs">
										24/7 Emergency
									</Badge>
									<div className="font-bold text-lg">
										{SITE_CONFIG.contact.phone}
									</div>
									<div className="text-sm text-primary mt-1">
										Tap to call now →
									</div>
								</div>
							</div>
						</CardContent>
					</a>
				</Card>

				{/* Email Card */}
				<Card className="group hover:shadow-lg transition-shadow">
					<a
						href={`mailto:${SITE_CONFIG.contact.email}`}
						className="block h-full"
					>
						<CardContent className="max-lg:px-4">
							<div className="flex flex-col items-start gap-4">
								<div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-muted/80 transition-colors">
									<Mail className="w-5 h-5 text-foreground" />
								</div>
								<div className="flex-1">
									<div className="text-sm text-muted-foreground mb-1">
										Email Us
									</div>
									<div className="font-bold text-lg">
										{SITE_CONFIG.contact.email}
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										We respond within 2 hours
									</div>
								</div>
							</div>
						</CardContent>
					</a>
				</Card>

				{/* Address Card */}
				<Card className="hover:shadow-lg transition-shadow">
					<CardContent className="max-lg:px-4">
						<div className="flex flex-col items-start gap-4">
							<div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
								<MapPin className="w-5 h-5 text-foreground" />
							</div>
							<div className="flex-1">
								<div className="text-sm text-muted-foreground mb-1">
									Service Area
								</div>
								<div className="font-bold text-lg">
									{SITE_CONFIG.contact.address}
								</div>
								<div className="text-sm text-muted-foreground mt-1">
									And surrounding areas
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Working Hours Card */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
							<Clock className="w-5 h-5" />
						</div>
						<CardTitle>Working Hours</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{SITE_CONFIG.workingHours.map((schedule) => (
							<div
								key={schedule.day}
								className="flex justify-between items-center"
							>
								<span className="text-muted-foreground">{schedule.day}</span>
								<span className="font-medium">{schedule.time}</span>
							</div>
						))}
					</div>
					<Separator className="my-4" />
					<Badge variant="destructive" className="gap-1.5">
						🚨 24/7 Emergency service available
					</Badge>
				</CardContent>
			</Card>
		</div>
	);
}
