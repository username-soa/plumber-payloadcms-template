"use client";

import { UploadCloud, AlertTriangle, Film, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FilePreview = {
	url: string | null;
	type: "image" | "video" | "file";
	name: string;
	size: number;
	file: File;
};

interface FileUploaderProps {
	filePreviews: FilePreview[];
	onFilesSelected: (files: File[]) => void;
	onRemoveFile: (index: number) => void;
	error: string | null;
	label?: string;
	required?: boolean;
	accept?: string;
	maxSize?: number;
}

export const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB default

export function FileUploader({
	filePreviews,
	onFilesSelected,
	onRemoveFile,
	error,
	label = "Attach Photos or Videos (Optional)",
	required,
	accept = "image/*,video/*,application/pdf",
	maxSize = MAX_TOTAL_SIZE,
}: FileUploaderProps) {
	const totalSize = filePreviews.reduce((acc, f) => acc + f.size, 0);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;
		onFilesSelected(files);
		e.target.value = "";
	};

	return (
		<div className="space-y-3">
			<Label htmlFor="attachment">
				{label} {required && <span className="text-red-500">*</span>}
			</Label>
			<div className="space-y-3">
				<div className="relative group cursor-pointer">
					<div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 transition-colors group-hover:border-primary/50 group-hover:bg-muted/50 text-center">
						<div className="flex flex-col items-center gap-3">
							<div className="p-3 bg-background rounded-full shadow-sm ring-1 ring-muted">
								<UploadCloud className="w-6 h-6 text-primary" />
							</div>
							<div>
								<p className="font-semibold text-sm">
									Click to upload or drag & drop
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									Max {(maxSize / (1024 * 1024)).toFixed(0)}MB
								</p>
							</div>
						</div>
					</div>
					<Input
						id="attachment"
						name="attachment"
						type="file"
						accept={accept}
						multiple
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
						onChange={handleFileChange}
					/>
				</div>

				{error && (
					<p className="text-sm text-destructive font-medium flex items-center gap-2">
						<AlertTriangle className="h-4 w-4" />
						{error}
					</p>
				)}

				{filePreviews.length > 0 && (
					<div className="grid grid-cols-1 gap-2">
						{filePreviews.map((preview, index) => (
							<div
								key={`${preview.name}-${index}`}
								className="relative rounded-xl border-2 border-dashed border-muted-foreground/25 p-3 flex items-center gap-3 bg-muted/30"
							>
								{preview.type === "image" && preview.url ? (
									<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-background">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										{/* biome-ignore lint/performance/noImgElement: Preview of user-uploaded file */}
										<img
											src={preview.url}
											alt="Preview"
											className="h-full w-full object-cover"
										/>
									</div>
								) : preview.type === "video" ? (
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground">
										<Film className="h-6 w-6" />
									</div>
								) : (
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground">
										<FileText className="h-6 w-6" />
									</div>
								)}
								<div className="flex-1 min-w-0">
									<p className="font-medium text-sm truncate">{preview.name}</p>
									<p className="text-xs text-muted-foreground">
										{Math.round(preview.size / 1024)} KB
									</p>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-muted-foreground hover:text-destructive"
									onClick={() => onRemoveFile(index)}
								>
									<X className="h-4 w-4" />
									<span className="sr-only">Remove file</span>
								</Button>
							</div>
						))}
						<div className="space-y-1 pt-2">
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>
									{Number(totalSize / (1024 * 1024)).toFixed(2)} MB used
								</span>
								<span>{(maxSize / (1024 * 1024)).toFixed(0)} MB limit</span>
							</div>
							<div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
								<div
									className={cn(
										"h-full transition-all duration-300 ease-in-out",
										totalSize / maxSize > 0.8
											? "bg-red-500"
											: totalSize / maxSize > 0.5
												? "bg-yellow-500"
												: "bg-green-500",
									)}
									style={{
										width: `${Math.min((totalSize / maxSize) * 100, 100)}%`,
									}}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			<p className="text-xs text-muted-foreground">
				Max 10MB total. Supported: Images, Videos, PDF
			</p>
		</div>
	);
}
