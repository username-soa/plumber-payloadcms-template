import type { Block } from "payload";

export const VideoPlayerBlock: Block = {
	slug: "videoPlayer",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "VideoLabel",
			},
		},
	},
	fields: [
		{
			name: "blockDescription",
			type: "ui",
			admin: {
				components: {
					Field: {
						path: "@/components/payload/BlockDescription",
					},
				},
				custom: {
					description:
						"Embed a self-hosted video with native HTML5 player controls. Supports MP4, WebM, and other video formats.",
				},
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "videoUrl",
					type: "text",
					required: true,
					label: "Video URL",
					admin: {
						description:
							"Enter the direct URL of the video (mp4, webm, etc.) or a YouTube/Vimeo link.",
						width: "50%",
					},
				},
				{
					name: "poster",
					type: "upload",
					relationTo: "media",
					label: "Poster Image",
					admin: {
						description: "Upload an image to show before the video plays.",
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing above this block.",
						width: "50%",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Add spacing below this block.",
						width: "50%",
					},
				},
			],
		},
	],
};
