import type { Block } from "payload";
import { background } from "@/fields/background";

export const WorkflowStepBlock: Block = {
	slug: "workflowStep",
	admin: {
		components: {
			Label: {
				path: "@/components/payload/BlockRowLabel",
				exportName: "WorkflowStepLabel",
			},
		},
	},
	labels: {
		singular: "Workflow Step",
		plural: "Workflow Steps",
	},
	fields: [
		background,
		{
			type: "row",
			fields: [
				{
					name: "stepNumber",
					type: "number",
					label: "Step Number",
					required: true,
					admin: {
						width: "20%",
					},
				},
				{
					name: "title",
					type: "text",
					label: "Title",
					required: true,
					admin: {
						width: "80%",
					},
				},
			],
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
		},
	],
};
