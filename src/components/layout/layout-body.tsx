"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { THEME_CONFIG } from "@/lib/theme-config";
import { Footer } from "@/components/layout/footer";
import type {
	Footer as FooterType,
	CompanyInfo as CompanyInfoType,
} from "@/payload-types";

// Dynamically import ThemeSwitcher to defer loading the motion library
// The theme switcher uses motion/react for drag animations which is heavy
const ThemeSwitcher = dynamic(
	() =>
		import("@/components/layout/theme-switcher").then(
			(mod) => mod.ThemeSwitcher,
		),
	{ ssr: false },
);

interface LayoutBodyProps {
	children: React.ReactNode;
	headerData: { navItems: { label: string; href: string }[] };
	footerData: FooterType;
	companyInfo: CompanyInfoType;
}

export function LayoutBody({
	children,
	headerData,
	footerData,
	companyInfo,
}: LayoutBodyProps) {
	return (
		<ThemeProvider
			attribute="data-theme"
			defaultTheme={THEME_CONFIG.defaultTheme}
			enableSystem
			disableTransitionOnChange
		>
			<Header navItems={headerData.navItems} phone={companyInfo.phone} />
			<ThemeSwitcher />
			<main className="flex-1">{children}</main>
			<Footer footerData={footerData} companyInfo={companyInfo} />
		</ThemeProvider>
	);
}
