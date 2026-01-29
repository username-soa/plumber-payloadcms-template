"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import { CallButton } from "./call-button";

export function MobileNav() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="lg:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full bg-primary text-primary-foreground hover:opacity-90 relative w-[48px] h-[48px] cursor-pointer"
					>
						<AnimatePresence mode="wait" initial={false}>
							{isOpen ? (
								<motion.div
									key="close"
									initial={{ opacity: 0, rotate: -90 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: 90 }}
									transition={{ duration: 0.2 }}
								>
									<X className="w-8 h-8" />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ opacity: 0, rotate: 90 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: -90 }}
									transition={{ duration: 0.2 }}
								>
									<Menu className="w-8 h-8" />
								</motion.div>
							)}
						</AnimatePresence>
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					className="w-screen max-w-none bg-neutral-950 border-none p-0"
					style={{ width: "100%", maxWidth: "none" }}
				>
					<SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
					<div className="flex flex-col h-full px-6 pb-6 pt-24">
						<nav className="flex flex-col gap-4 text-left mt-24 items-start">
							{SITE_CONFIG.navLinks.map((link) => (
								<Link
									key={link.href + link.label}
									href={link.href}
									className="text-4xl font-semibold text-white hover:text-primary transition-colors py-2"
									onClick={() => setIsOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</nav>

						<div className="mt-auto sm:hidden flex flex-col gap-4">
							<CallButton fullWidth />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
