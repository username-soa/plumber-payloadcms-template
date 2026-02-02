import type { Page } from "@/payload-types";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BackLinkProps = NonNullable<Page["layout"]>[number] & {
	blockType: "backLink";
};

export function BackLink({ label, href, centered }: BackLinkProps) {
	return (
		<section className="container mx-auto px-4 pt-4 pb-10">
			<div
				className={cn(
					"max-w-3xl mx-auto",
					centered ? "text-center" : "text-left",
				)}
			>
				<Link
					href={href || "/"}
					className="text-primary hover:underline text-sm"
				>
					← {label || "Back to Home"}
				</Link>
			</div>
		</section>
	);
}
