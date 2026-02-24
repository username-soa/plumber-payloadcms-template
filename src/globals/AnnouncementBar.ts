import type { GlobalConfig } from "payload";

import { link } from "../fields/link";
import { revalidateGlobal } from "../hooks/revalidateGlobal";

export const AnnouncementBar: GlobalConfig = {
	slug: "announcement-bar",
	label: "Announcement Bar",
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [revalidateGlobal("announcement-bar")],
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "backgroundColor",
					type: "select",
					defaultValue: "primary",
					options: [
						{ label: "Branding (Primary)", value: "primary" },
						{ label: "Emergency (Red)", value: "emergency" },
						{ label: "Alert (Orange)", value: "alert" },
						{ label: "Dark", value: "dark" },
						{ label: "Subtle", value: "subtle" },
					],
					admin: { width: "50%" },
				},
				{
					name: "textColor",
					type: "select",
					defaultValue: "white",
					options: [
						{ label: "White", value: "white" },
						{ label: "Black", value: "black" },
					],
					admin: { width: "50%" },
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "interval",
					type: "number",
					label: "Rotation Interval (seconds)",
					defaultValue: 5,
					min: 2,
					max: 30,
					admin: {
						width: "50%",
						description: "Time between message rotations",
					},
				},
				{
					name: "orientation",
					type: "select",
					defaultValue: "horizontal",
					options: [
						{ label: "Horizontal", value: "horizontal" },
						{ label: "Vertical", value: "vertical" },
					],
					admin: { width: "50%" },
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "enabled",
					type: "checkbox",
					label: "Enable Announcement Bar",
					defaultValue: true,
					admin: {
						width: "50%",
						description: "Show or hide the announcement bar across the site.",
					},
				},
				{
					name: "isDismissible",
					type: "checkbox",
					label: "Is Dismissible",
					defaultValue: true,
					admin: {
						width: "50%",
						description: "Allow users to close the announcement bar.",
					},
				},
			],
		},
		{
			name: "messages",
			type: "array",
			required: true,
			minRows: 1,
			fields: [
				{
					name: "text",
					type: "text",
					required: true,
				},
				link({
					name: "link",
					label: "Call to Action",
					required: false,
				}),
			],
		},
	],
};
