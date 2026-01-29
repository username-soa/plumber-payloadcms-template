"use client";

import { Facebook, Linkedin, Link2, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

interface ShareButtonsProps {
	title: string;
	url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
	const [copied, setCopied] = useState(false);
	const [shareUrl, setShareUrl] = useState(url || "");

	// Set the URL on the client side only to avoid hydration mismatch
	useEffect(() => {
		if (!url) {
			setShareUrl(window.location.href);
		}
	}, [url]);

	const encodedUrl = encodeURIComponent(shareUrl);
	const encodedTitle = encodeURIComponent(title);

	const shareLinks = [
		{
			name: "Twitter",
			icon: Twitter,
			href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
		},
		{
			name: "Facebook",
			icon: Facebook,
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		},
	];

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for older browsers
			const textArea = document.createElement("textarea");
			textArea.value = shareUrl;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="space-y-3">
			<h4 className="font-semibold text-sm text-foreground">Share this post</h4>
			<div className="flex gap-2">
				<TooltipProvider delayDuration={0}>
					{shareLinks.map((link) => (
						<Tooltip key={link.name}>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="transition-colors hover:bg-primary/10 hover:text-primary"
									asChild
								>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`Share on ${link.name}`}
									>
										<link.icon className="w-4 h-4" />
									</a>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Share on {link.name}</p>
							</TooltipContent>
						</Tooltip>
					))}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className={`transition-colors ${copied ? "bg-green-500/10 text-green-500" : "hover:bg-muted"}`}
								onClick={copyToClipboard}
								aria-label="Copy link"
							>
								<Link2 className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{copied ? "Copied!" : "Copy link"}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
