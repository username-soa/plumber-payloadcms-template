"use client";

/**
 * A reusable UI component that displays a description text below block titles
 * to help users understand the functionality of each block.
 */
export const BlockDescription = ({
	field,
}: {
	field: { admin?: { custom?: { description?: string } } };
}) => {
	const description =
		field?.admin?.custom?.description || "No description available";

	return (
		<div
			style={{
				padding: "12px 16px",
				backgroundColor: "var(--theme-elevation-50)",
				borderRadius: "4px",
				marginBottom: "16px",
				borderLeft: "3px solid var(--theme-elevation-400)",
			}}
		>
			<p
				style={{
					margin: 0,
					fontSize: "13px",
					lineHeight: "1.5",
					color: "var(--theme-elevation-800)",
				}}
			>
				{description}
			</p>
		</div>
	);
};

export default BlockDescription;
