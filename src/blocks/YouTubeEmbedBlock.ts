import type { Block } from "payload";
import { background } from "@/fields/background";

export const YouTubeEmbedBlock: Block = {
	slug: "youtubeEmbed",
	labels: {
		singular: "YouTube Video",
		plural: "YouTube Videos",
	},
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "YouTubeLabel",
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
						"Embed a YouTube video by pasting its URL. The video will be displayed in a responsive player with an optional title.",
				},
			},
		},
		background,
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					defaultValue: true,
					admin: {
						description: "Add extra spacing above this block",
					},
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					defaultValue: true,
					admin: {
						description: "Add extra spacing below this block",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "videoUrl",
					label: "YouTube URL",
					type: "text",
					required: true,
					admin: {
						width: "50%",
						placeholder: "https://www.youtube.com/watch?v=VIDEO_ID",
						description:
							"Paste the full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ)",
					},
				},
				{
					name: "title",
					label: "Video Title",
					type: "text",
					admin: {
						width: "50%",
						description: "Optional caption displayed below the video",
					},
				},
			],
		},
	],
};
