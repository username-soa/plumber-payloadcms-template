import type React from "react";

type Props = {
	stats: {
		id?: string;
		value: string;
		label: string;
	}[];
};

export const SimpleStatsBlock: React.FC<Props> = ({ stats }) => {
	if (!stats || stats.length === 0) return null;

	return (
		<div className="grid grid-cols-2 gap-4 my-6">
			{stats.map((stat, index) => (
				<div
					key={stat.id || index}
					className="flex flex-col items-center justify-center p-6 border rounded-xl hover:shadow-md transition-shadow duration-300 text-center"
				>
					<span className="text-2xl font-bold text-primary mb-1">
						{stat.value}
					</span>
					<span className="text-sm font-medium text-muted-foreground">
						{stat.label}
					</span>
				</div>
			))}
		</div>
	);
};
