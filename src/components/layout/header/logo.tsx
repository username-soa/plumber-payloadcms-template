import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export function Logo() {
	return (
		<Link href="/" className="flex h-full absolute top-0 left-0">
			<div className="relative flex items-center">
				<div className="absolute top-0 bottom-0 left-[-50px] w-[calc(100%+50px)] bg-primary -skew-x-20 rounded-br-xl" />
				<div className="relative z-10 xl:pl-10 pl-6 xl:pr-16 pr-8 py-6 font-bold 2xl:text-[2vw] sm:text-3xl text-2xl text-primary-foreground leading-none select-none">
					{SITE_CONFIG.brand.name}
				</div>
			</div>
		</Link>
	);
}
