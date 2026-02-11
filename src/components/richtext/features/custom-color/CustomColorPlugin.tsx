"use client";

import type React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import {
	$getSelection,
	$isRangeSelection,
	$createRangeSelection,
	$setSelection,
	$addUpdateTag,
	SKIP_DOM_SELECTION_TAG,
	createCommand,
	COMMAND_PRIORITY_EDITOR,
	type LexicalCommand,
} from "@payloadcms/richtext-lexical/lexical";
import { $patchStyleText } from "@payloadcms/richtext-lexical/lexical/selection";
import { Sketch } from "@uiw/react-color";
import { Trash2 } from "lucide-react";
import type { ColorResult } from "@uiw/color-convert";
import "./custom-color-picker.css";

// Define the command to open the picker
export const OPEN_CUSTOM_COLOR_PICKER_COMMAND: LexicalCommand<{
	anchorPos: { top: number; left: number };
	initialColor?: string;
}> = createCommand("OPEN_CUSTOM_COLOR_PICKER_COMMAND");

export const CustomColorPlugin: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	const [hex, setHex] = useState("#333333");
	const [isOpen, setIsOpen] = useState(false);
	const [portalPos, setPortalPos] = useState<{
		top: number;
		left: number;
	} | null>(null);

	const lastSelectionRef = useRef<{
		anchorKey: string;
		anchorOffset: number;
		focusKey: string;
		focusOffset: number;
	} | null>(null);

	// Track selection changes so we can restore it when applying colors
	// This plugin stays mounted, so it will always track the selection
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection) && !selection.isCollapsed()) {
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

	// Register the command to open the picker
	useEffect(() => {
		return editor.registerCommand(
			OPEN_CUSTOM_COLOR_PICKER_COMMAND,
			(payload) => {
				setPortalPos(payload.anchorPos);
				if (payload.initialColor) {
					setHex(payload.initialColor);
				}
				setIsOpen(true);
				return true;
			},
			COMMAND_PRIORITY_EDITOR,
		);
	}, [editor]);

	// Close on Escape key
	useEffect(() => {
		if (!isOpen) return;
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [isOpen]);

	const applyColor = useCallback(
		(newColor: string | null) => {
			editor.update(() => {
				// CRITICAL: Prevent Lexical from reconciling DOM selection,
				// which would steal focus from the color picker
				$addUpdateTag(SKIP_DOM_SELECTION_TAG);

				let selection = $getSelection();

				if (
					(!$isRangeSelection(selection) || selection.isCollapsed()) &&
					lastSelectionRef.current
				) {
					const { anchorKey, anchorOffset, focusKey, focusOffset } =
						lastSelectionRef.current;

					const newSelection = $createRangeSelection();
					newSelection.anchor.set(anchorKey, anchorOffset, "text");
					newSelection.focus.set(focusKey, focusOffset, "text");

					$setSelection(newSelection);
					selection = newSelection;
				}

				if ($isRangeSelection(selection) && !selection.isCollapsed()) {
					$patchStyleText(selection, { color: newColor });
				}
			});
		},
		[editor],
	);

	const removeColor = useCallback(() => {
		applyColor(null);
		setIsOpen(false);
	}, [applyColor]);

	// The popup rendered via portal at document.body level
	// This stays mounted even if the toolbar that triggered it unmounts
	if (!isOpen || !portalPos) return null;

	return createPortal(
		<>
			{/* Invisible backdrop – clicking it closes the panel */}
			<button
				type="button"
				aria-label="Close color picker"
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 99998,
					cursor: "default",
					backgroundColor: "transparent",
					border: "none",
					padding: 0,
					margin: 0,
					width: "100%",
					height: "100%",
				}}
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();
					setIsOpen(false);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen(false);
					}
				}}
			/>
			{/* The actual color picker panel */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Custom Color Picker"
				className="ccp-portal"
				style={{
					position: "fixed",
					top: portalPos.top,
					left: portalPos.left,
					zIndex: 99999,
				}}
				onMouseDown={(e) => {
					// Stop propagation so clicks inside don't close it
					e.stopPropagation();
				}}
				onPointerDown={(e) => {
					e.stopPropagation();
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
				onKeyDown={(e) => {
					e.stopPropagation();
				}}
			>
				<Sketch
					color={hex}
					onChange={(color: ColorResult) => {
						setHex(color.hex);
						applyColor(color.hex);
					}}
					presetColors={[
						"#ea580c",
						"#c2410c",
						"#0d9488",
						"#1e3a5f",
						"#2563eb",
						"#ffffff",
						"#000000",
					]}
					style={{
						boxShadow: "none",
						background: "transparent",
						color: "inherit",
						borderRadius: "0",
					}}
				/>
				<button
					type="button"
					className="ccp-remove-color-btn"
					onClick={(e) => {
						e.stopPropagation();
						removeColor();
					}}
					onMouseDown={(e) => {
						e.stopPropagation();
					}}
				>
					<Trash2 />
					Remove Color
				</button>
			</div>
		</>,
		document.body,
	);
};
