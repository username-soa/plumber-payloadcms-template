"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { THEME_CONFIG } from "@/lib/theme-config";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type {
	Footer as FooterType,
	CompanyInfo as CompanyInfoType,
	AnnouncementBar as AnnouncementBarType,
} from "@/payload-types";

import type { CMSLinkType } from "@/lib/cms-link";

// Dynamically import ThemeSwitcher to defer loading the motion library
// The theme switcher uses motion/react for drag animations which is heavy
const ThemeSwitcher = dynamic(
	() =>
		import("@/components/layout/theme-switcher").then(
			(mod) => mod.ThemeSwitcher,
		),
	{ ssr: false },
);

type HeaderLinkItem = {
	id?: string | null;
	link: CMSLinkType;
};

interface LayoutBodyProps {
	children: React.ReactNode;
	headerData: { navItems: HeaderLinkItem[] };
	footerData: FooterType;
	companyInfo: CompanyInfoType;
	announcementBarData: AnnouncementBarType;
}

export function LayoutBody({
	children,
	headerData,
	footerData,
	companyInfo,
	announcementBarData,
}: LayoutBodyProps) {
	return (
		<ThemeProvider
			attribute="data-theme"
			defaultTheme={THEME_CONFIG.defaultTheme}
			enableSystem
			disableTransitionOnChange
		>
			<AnnouncementBar data={announcementBarData} />
			<Header navItems={headerData.navItems} phone={companyInfo.phone} />
			<ThemeSwitcher />
			<main className="flex-1">{children}</main>
			<Footer footerData={footerData} companyInfo={companyInfo} />
		</ThemeProvider>
	);
}
