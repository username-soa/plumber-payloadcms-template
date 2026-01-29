"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { Logo } from "./logo";
import { DesktopNav } from "./desktop-nav";
import { CallButton } from "./call-button";

// Dynamically import MobileNav to defer loading the motion library
// The mobile nav uses motion/react for menu icon animations
const MobileNav = dynamic(
	() => import("./mobile-nav").then((mod) => mod.MobileNav),
	{
		ssr: false,
		loading: () => (
			<div className="lg:hidden">
				<div className="w-[48px] h-[48px] rounded-full bg-primary animate-pulse" />
			</div>
		),
	},
);

const HEADER_Z_INDEX = 60;
const TRANSITION_DURATION = 300;

export function Header() {
	const isVisible = useScrollVisibility({ threshold: 50 });

	return (
		<header
			className={cn(
				"fixed top-0 left-0 w-full flex items-center justify-between",
				"px-6 md:px-12 xl:h-24 sm:h-20 h-16",
				"transition-transform",
				isVisible ? "translate-y-0" : "-translate-y-full",
			)}
			style={{
				zIndex: HEADER_Z_INDEX,
				transitionDuration: `${TRANSITION_DURATION}ms`,
			}}
		>
			<Logo />
			<DesktopNav />
			<div className="ml-auto flex items-center gap-4">
				<CallButton />
				<MobileNav />
			</div>
		</header>
	);
}
