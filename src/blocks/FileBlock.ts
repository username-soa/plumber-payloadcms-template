import { Block } from "payload";

export const FileBlock: Block = {
	slug: "file",
	labels: {
		singular: "File Upload",
		plural: "File Uploads",
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Name (Lowercase, no spaces)",
			required: true,
		},
		{
			name: "label",
			type: "text",
			label: "Label",
			required: true,
		},
		{
			name: "width",
			type: "number",
			label: "Field Width (percentage)",
			defaultValue: 100,
		},
		{
			name: "required",
			type: "checkbox",
			label: "Required",
			defaultValue: false,
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
		},
	],
};
