"use client";

import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { PaintBucket } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { OPEN_CUSTOM_COLOR_PICKER_COMMAND } from "./CustomColorPlugin";
import "./custom-color-picker.css";

// This is now just a dumb trigger component
// It doesn't hold state, so it doesn't matter if it unmounts occasionally
export const CustomColorPicker: React.FC = () => {
	const [editor] = useLexicalComposerContext();

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			e.stopPropagation();

			const rect = e.currentTarget.getBoundingClientRect();
			editor.dispatchCommand(OPEN_CUSTOM_COLOR_PICKER_COMMAND, {
				anchorPos: {
					top: rect.bottom + 4,
					left: rect.left,
				},
			});
		},
		[editor],
	);

	return (
		<button
			type="button"
			className="custom-color-trigger"
			title="Custom color"
			onClick={handleClick}
			onMouseDown={(e) => {
				// Prevent default focus behavior on the button itself
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<PaintBucket size={16} style={{ width: "16px", height: "16px" }} />
		</button>
	);
};
