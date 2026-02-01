"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallButtonProps {
	/** Full width button for mobile menu */
	fullWidth?: boolean;
	phone: string;
}

export function CallButton({ fullWidth = false, phone }: CallButtonProps) {
	if (fullWidth) {
		return (
			<Button
				asChild
				size="lg"
				className="w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-6 text-lg cursor-pointer"
			>
				<a href={`tel:${phone}`}>
					<Phone className="w-5 h-5 mr-2 ring-animation" fill="currentColor" />
					{phone}
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
				<a href={`tel:${phone}`}>
					<Phone className="w-5 h-5 mr-2 ring-animation" fill="currentColor" />
					{phone}
				</a>
			</Button>
		</div>
	);
}
