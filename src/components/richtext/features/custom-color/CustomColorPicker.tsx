"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import {
	$getSelection,
	$isRangeSelection,
	$createParagraphNode,
	$createTextNode,
	$getNodeByKey,
	$createRangeSelection,
} from "@payloadcms/richtext-lexical/lexical";
import { $patchStyleText } from "@payloadcms/richtext-lexical/lexical/selection";
import { PaintBucket } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const CustomColorPicker: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	const [color, setColor] = useState("#000000");
	const lastSelectionRef = useRef<{
		anchorKey: string;
		anchorOffset: number;
		focusKey: string;
		focusOffset: number;
	} | null>(null);

	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const anchor = selection.anchor;
					const focus = selection.focus;
					lastSelectionRef.current = {
						anchorKey: anchor.key,
						anchorOffset: anchor.offset,
						focusKey: focus.key,
						focusOffset: focus.offset,
					};
				}
			});
		});
	}, [editor]);

	const applyColor = useCallback(
		(newColor: string) => {
			setColor(newColor);
			editor.update(() => {
				let selection = $getSelection();

				if (!selection && lastSelectionRef.current) {
					const { anchorKey, anchorOffset, focusKey, focusOffset } =
						lastSelectionRef.current;
					
					// Recreate the selection
					const newSelection = $createRangeSelection();
					newSelection.anchor.set(anchorKey, anchorOffset, "text");
					newSelection.focus.set(focusKey, focusOffset, "text");
					
					$patchStyleText(newSelection, { color: newColor });
				} else if ($isRangeSelection(selection)) {
					$patchStyleText(selection, { color: newColor });
				}
			});
		},
		[editor],
	);

	const handleInputClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					title="Custom color"
					onClick={(e) => {
						// Prevent the click from stealing focus or closing the toolbar unexpectedly
						e.stopPropagation();
					}}
				>
					<PaintBucket className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent 
				className="w-64 p-3 z-50 pointer-events-auto" 
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<div className="flex flex-col gap-2">
					<Label>Select Custom Color</Label>
					<div className="flex gap-2 items-center">
						<input
							type="color"
							value={color}
							onChange={(e) => applyColor(e.target.value)}
							onClick={handleInputClick}
							className="h-8 w-8 cursor-pointer border-0 p-0"
						/>
						<Input
							value={color}
							onChange={(e) => applyColor(e.target.value)}
							onClick={handleInputClick}
							placeholder="#000000"
							className="h-8"
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
