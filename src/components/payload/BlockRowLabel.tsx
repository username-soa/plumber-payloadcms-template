"use client";

import type { LucideIcon } from "lucide-react";
import {
	AlertCircle,
	BarChart,
	Box,
	FlipHorizontal,
	Image as ImageIcon,
	Info,
	Lightbulb,
	Link as LinkIcon,
	Megaphone,
	MessageSquareQuote,
	MoveVertical,
	ListOrdered,
	PlayCircle,
	Repeat,
	Table2,
	Youtube,
	Activity,
	ArrowLeft,
	Award,
	CheckSquare,
	Columns2,
	Contact,
	CreditCard,
	Database,
	File,
	FormInput,
	GitCommit,
	Hash,
	HelpCircle,
	Home,
	LayoutGrid,
	ListChecks,
	MapPin,
	MousePointerClick,
	Scale,
	ShieldCheck,
	Star,
	Type,
	Users,
	Zap,
} from "lucide-react";

interface BlockData {
	type?: string;
	[key: string]: unknown;
}

/**
 * Thumbnail Component
 * Renders an image if available, otherwise renders the provided Icon.
 */
const Thumbnail = ({ icon: Icon }: { icon: LucideIcon }) => {
	return <Icon size={14} className="size-4 text-muted-foreground" />;
};

// Generic Row Label Component
export const BlockRowLabel = ({
	blockType,
	icon = Box,
}: {
	blockType?: string;
	icon?: LucideIcon;
}) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "8px",
				padding: "3px 8px",
				background: "var(--theme-elevation-0)",
				borderRadius: "6px",
				color: "white",
				width: "fit-content",
			}}
		>
			<Thumbnail icon={icon} />
			<span style={{ fontSize: "12px" }}>{blockType}</span>
		</div>
	);
};

export const CTALabel = () => {
	return <BlockRowLabel blockType="Call To Action Block" icon={Megaphone} />;
};

export const CalloutLabel = ({ data }: { data: BlockData }) => {
	const calloutType = data?.type || "info";
	const iconMap: Record<string, LucideIcon> = {
		info: Info,
		warning: AlertCircle,
		tip: Lightbulb,
	};

	return (
		<BlockRowLabel
			blockType="Callout Block"
			icon={iconMap[calloutType] || Info}
		/>
	);
};

export const TestimonialLabel = () => {
	return (
		<BlockRowLabel blockType="Testimonials Block" icon={MessageSquareQuote} />
	);
};

export const VideoLabel = () => {
	return <BlockRowLabel blockType="Video Block" icon={PlayCircle} />;
};

export const GalleryLabel = () => {
	return <BlockRowLabel blockType="Gallery Block" icon={ImageIcon} />;
};

export const BeforeAfterLabel = () => {
	return (
		<BlockRowLabel blockType="Before & After Block" icon={FlipHorizontal} />
	);
};
export const ServiceLinkLabel = () => {
	return <BlockRowLabel blockType="Service Link Block" icon={LinkIcon} />;
};

export const StatsRowLabel = () => {
	return <BlockRowLabel blockType="Stats" icon={BarChart} />;
};

export const TimelineLabel = () => {
	return <BlockRowLabel blockType="Timeline Block" />;
};

export const SpacingLabel = () => {
	return <BlockRowLabel blockType="Spacing Block" icon={MoveVertical} />;
};

export const TableLabel = () => {
	return <BlockRowLabel blockType="Table Block" icon={Table2} />;
};

export const YouTubeLabel = () => {
	return <BlockRowLabel blockType="YouTube Video Block" icon={Youtube} />;
};

export const MarqueeLabel = () => {
	return <BlockRowLabel blockType="Marquee Block" icon={Repeat} />;
};

export const StepTimelineLabel = () => {
	return <BlockRowLabel blockType="Timeline (Step) Block" icon={ListOrdered} />;
};

export const FeatureListLabel = () => {
	return <BlockRowLabel blockType="Feature List Step" icon={CheckSquare} />;
};

export const WorkflowStepLabel = () => {
	return <BlockRowLabel blockType="Workflow Step Step" icon={GitCommit} />;
};

export const SimpleStatsLabel = () => {
	return <BlockRowLabel blockType="Simple Stats Step" icon={Activity} />;
};

export const DualColumnLabel = () => {
	return <BlockRowLabel blockType="Dual Column Block" icon={Columns2} />;
};

export const FormLabel = () => {
	return <BlockRowLabel blockType="Form Block" icon={FormInput} />;
};

export const FAQLabel = () => {
	return <BlockRowLabel blockType="FAQ(s) Block" icon={HelpCircle} />;
};

export const ReviewLabel = () => {
	return <BlockRowLabel blockType="Reviews Block" icon={Star} />;
};

/* export const CertificationsLabel = () => {
	return <BlockRowLabel blockType="Certifications" icon={Award} />;
}; */

export const TeamLabel = () => {
	return <BlockRowLabel blockType="Our Team Block" icon={Users} />;
};

/* export const TrustStatsLabel = () => {
	return <BlockRowLabel blockType="Trust Stats" icon={ShieldCheck} />;
}; */

export const ContentFetcherLabel = () => {
	return <BlockRowLabel blockType="Fetcher Block" icon={Database} />;
};

export const TitleContentLabel = () => {
	return <BlockRowLabel blockType="Title Content Block" icon={Type} />;
};

export const ImagesGridLabel = () => {
	return <BlockRowLabel blockType="Images Grid Block" icon={LayoutGrid} />;
};

export const CardsGridLabel = () => {
	return <BlockRowLabel blockType="Cards Grid Block" icon={CreditCard} />;
};

export const ServiceAreasLabel = () => {
	return <BlockRowLabel blockType="Service Areas Block" icon={MapPin} />;
};

export const HighlightedServicesLabel = () => {
	return <BlockRowLabel blockType="Highlighted Services Block" icon={Zap} />;
};

export const NumbersLabel = () => {
	return <BlockRowLabel blockType="Numbers/Stats Block" icon={Hash} />;
};

export const LegalContentLabel = () => {
	return <BlockRowLabel blockType="Legal Content Block" icon={Scale} />;
};

export const LegalContactLabel = () => {
	return <BlockRowLabel blockType="Legal Contact Block" icon={Contact} />;
};

export const BackLinkLabel = () => {
	return <BlockRowLabel blockType="Back Link Block" icon={ArrowLeft} />;
};

export const CheckboxGroupLabel = () => {
	return <BlockRowLabel blockType="Checkbox Group" icon={ListChecks} />;
};

export const FileLabel = () => {
	return <BlockRowLabel blockType="File Input" icon={File} />;
};

export const PropertyTypeLabel = () => {
	return <BlockRowLabel blockType="Property Type Input" icon={Home} />;
};

export const ServiceSelectLabel = () => {
	return (
		<BlockRowLabel blockType="Service Select Input" icon={MousePointerClick} />
	);
};

export const UrgencyLabel = () => {
	return <BlockRowLabel blockType="Urgency Input" icon={Zap} />;
};
