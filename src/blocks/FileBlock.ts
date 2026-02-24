import type { Block } from "payload";

export const FileBlock: Block = {
	slug: "file",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "FileLabel",
			},
		},
	},
	labels: {
		singular: "File Upload",
		plural: "File Uploads",
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					label: "Name (Lowercase, no spaces)",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "label",
					type: "text",
					label: "Label",
					required: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			admin: {
				width: "50%",
			},
			fields: [
				{
					name: "width",
					type: "number",
					label: "Field Width (percentage)",
					defaultValue: 100,
					admin: {
						width: "50%",
					},
				},
				{
					name: "allowedFileTypes",
					type: "select",
					label: "Allowed File Types",
					defaultValue: "all",
					options: [
						{ label: "All Files", value: "all" },
						{ label: "Images Only", value: "image/*" },
						{ label: "PDFs Only", value: "application/pdf" },
						{ label: "Images & PDFs", value: "image/*,application/pdf" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},

		{
			name: "required",
			type: "checkbox",
			label: "Required",
			defaultValue: false,
		},
	],
};
