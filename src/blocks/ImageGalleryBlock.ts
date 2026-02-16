import type { Block } from "payload";
import { background } from "@/fields/background";

export const ImageGalleryBlock: Block = {
	slug: "imageGallery",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "GalleryLabel",
			},
		},
	},
	labels: {
		singular: "Image Gallery",
		plural: "Image Galleries",
	},
	fields: [
		background,
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
						"Display a collection of images in a grid or carousel layout with optional captions for each image.",
				},
			},
		},
		{
			name: "style",
			type: "select",
			label: "Gallery Style",
			admin: {
				description: "Choose how the images will be displayed",
			},
			options: [
				{ label: "Grid", value: "grid" },
				{ label: "Carousel", value: "carousel" },
			],
			defaultValue: "grid",
		},
		{
			type: "row",
			fields: [
				{
					name: "paddingTop",
					type: "checkbox",
					label: "Add Top Padding",
					admin: {
						width: "50%",
						description: "Add spacing above the gallery",
					},
					defaultValue: true,
				},
				{
					name: "paddingBottom",
					type: "checkbox",
					label: "Add Bottom Padding",
					admin: {
						width: "50%",
						description: "Add spacing below the gallery",
					},
					defaultValue: true,
				},
			],
		},
		{
			name: "images",
			type: "array",
			label: "Gallery Images",
			admin: {
				description: "Add images to the gallery with optional captions",
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "image",
							type: "upload",
							label: "Image",
							relationTo: "media",
							required: true,
							admin: {
								width: "50%",
								description: "Select an image for the gallery",
							},
						},
						{
							name: "caption",
							type: "text",
							label: "Caption",
							admin: {
								width: "50%",
								description: "Optional caption for the image",
							},
						},
					],
				},
			],
			required: true,
		},
	],
};
