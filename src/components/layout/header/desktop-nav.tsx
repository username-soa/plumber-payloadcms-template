import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function DesktopNav() {
	const pathname = usePathname();

	return (
		<LiquidGlass
			className="absolute left-1/2 -translate-x-1/2 hidden lg:block"
			cornerRadius={40}
			baseStrength={12}
			softness={10}
		>
			<nav className="flex items-center gap-2 text-white font-medium px-1 py-[5px]">
				{SITE_CONFIG.navLinks.map((link) => {
					const isActive = pathname === link.href;

					return (
						<Link
							key={link.href + link.label}
							href={link.href}
							className={cn(
								"relative px-4 py-1.5 rounded-full transition-colors [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]",
								isActive ? "text-white/80" : "text-white hover:text-white/80",
							)}
						>
							{isActive && (
								<motion.span
									layoutId="active-nav-indicator"
									className="absolute inset-0 bg-primary/80 rounded-full"
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 30,
									}}
								/>
							)}
							<span className="relative z-10">{link.label}</span>
						</Link>
					);
				})}
			</nav>
		</LiquidGlass>
	);
}
