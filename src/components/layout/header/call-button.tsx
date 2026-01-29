"use client";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { Phone } from "lucide-react";

interface CallButtonProps {
	/** Full width button for mobile menu */
	fullWidth?: boolean;
}

export function CallButton({ fullWidth = false }: CallButtonProps) {
	if (fullWidth) {
		return (
			<Button
				asChild
				size="lg"
				className="w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-6 text-lg cursor-pointer"
			>
				<a href={`tel:${SITE_CONFIG.contact.phone}`}>
					<Phone className="w-5 h-5 mr-2 ring-animation" fill="currentColor" />
					{SITE_CONFIG.contact.phone}
				</a>
			</Button>
		);
	}

	return (
		<div className="hidden sm:block">
			<Button
				asChild
				size="lg"
				className="rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-6 cursor-pointer"
			>
				<a href={`tel:${SITE_CONFIG.contact.phone}`}>
					<Phone className="w-5 h-5 mr-2 ring-animation" fill="currentColor" />
					{SITE_CONFIG.contact.phone}
				</a>
			</Button>
		</div>
	);
}
