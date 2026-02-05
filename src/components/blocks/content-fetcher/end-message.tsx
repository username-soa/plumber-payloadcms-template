import { Sparkles } from "lucide-react";

const EndMessage = ({ totalItems }: { totalItems: number }) => {
	return (
		<div className="flex flex-col items-center mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Gradient divider */}
			<div className="w-full max-w-xs h-px bg-linear-to-r from-transparent via-border to-transparent mb-6" />

			{/* End message */}
			<div className="flex flex-col items-center gap-3">
				<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
					<Sparkles className="w-5 h-5 text-primary" />
				</div>
				<div className="text-center">
					<p className="text-sm font-medium text-foreground/80">
						You&apos;ve seen it all
					</p>
					<p className="text-xs text-muted-foreground mt-1">
						{totalItems} {totalItems === 1 ? "item" : "items"} explored
					</p>
				</div>
			</div>
		</div>
	);
};

export default EndMessage;
