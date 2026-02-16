import type React from "react";

type Props = {
	stepNumber: number;
	title: string;
	description?: string;
};

export const WorkflowStepBlock: React.FC<Props> = ({
	stepNumber,
	title,
	description,
}) => {
	return (
		<div className="flex gap-5 my-6 last:mb-0">
			<div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">
				{stepNumber}
			</div>
			<div className="flex flex-col gap-1.5 pt-1">
				<p className="text-lg font-semibold text-foreground leading-none">
					{title}
				</p>
				{description && (
					<p className="text-muted-foreground text-base">{description}</p>
				)}
			</div>
		</div>
	);
};
