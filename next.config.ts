import withBundleAnalyzer from "@next/bundle-analyzer";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	experimental: {
		inlineCss: true,
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/api/media/**",
			},
		],
		// Allow loading images from localhost during development
		dangerouslyAllowSVG: true,
		// Use unoptimized for local development to bypass private IP check
		unoptimized: process.env.NODE_ENV === "development",
	},
};

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

// Wrap with PayloadCMS integration
export default withPayload(bundleAnalyzer(nextConfig));
