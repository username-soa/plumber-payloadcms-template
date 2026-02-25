import React from "react";

interface HighlightedTitleProps {
	title: string;
	highlight?: string | null;
}

export const HighlightedTitle: React.FC<HighlightedTitleProps> = ({
	title,
	highlight,
}) => {
	if (!highlight || !title.includes(highlight)) {
		return <>{title}</>;
	}

	const parts = title.split(highlight);
	return (
		<>
			{parts.map((part, index) => (
				<React.Fragment key={`${index}-${part}`}>
					{part}
					{index < parts.length - 1 && (
						<span className="text-primary">{highlight}</span>
					)}
				</React.Fragment>
			))}
		</>
	);
};
