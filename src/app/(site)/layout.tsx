import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Bebas_Neue } from "next/font/google";
import "../globals.css";
import { LayoutBody } from "@/components/layout/layout-body";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "900"],
});

const bebas = Bebas_Neue({
	variable: "--font-bebas",
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata: Metadata = {
	title: "Plumbing Services",
	description: "Professional Plumbing Template",
};

import { getCommonGlobals } from "@/lib/payload/getGlobals";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [headerData, footerData, companyInfo, announcementBarData] = await getCommonGlobals();

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${bebas.variable} antialiased min-h-screen flex flex-col`}
			>
				<NuqsAdapter>
					<LayoutBody
						headerData={headerData}
						footerData={footerData}
						companyInfo={companyInfo}
						announcementBarData={announcementBarData}
					>
						{children}
					</LayoutBody>
					<Toaster />
				</NuqsAdapter>
			</body>
		</html>
	);
}
