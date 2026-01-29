"use client";

import { cn } from "@/lib/utils";
import {
	Info,
	AlertTriangle,
	XCircle,
	CheckCircle,
	Lightbulb,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CalloutProps {
	type?: "default" | "info" | "warning" | "danger" | "success" | "tip";
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export function Callout({
	type = "default",
	title,
	children,
	className,
}: CalloutProps) {
	const icons = {
		default: Info,
		info: Info,
		warning: AlertTriangle,
		danger: XCircle,
		success: CheckCircle,
		tip: Lightbulb,
	};

	const Icon = icons[type] || Info;

	const variants = {
		default: "bg-muted border-border text-foreground",
		info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100",
		warning:
			"bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-100",
		danger:
			"bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-100",
		success:
			"bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-100",
		tip: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-100",
	};

	return (
		<Alert className={cn("my-6 not-prose", variants[type], className)}>
			<Icon className="h-4 w-4" />
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
}
