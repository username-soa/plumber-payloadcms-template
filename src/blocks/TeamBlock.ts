import type { Block } from "payload";

export const TeamBlock: Block = {
	slug: "team",
	fields: [
		{
			name: "title",
			type: "text",
			defaultValue: "Meet Your Experts",
			label: "Title",
		},
        {
            name: "titleHighlight",
            type: "text",
            label: "Title Highlight",
            admin: {
                description: "Text to highlight in the title (e.g. 'Water City Plumbing Experts')",
            }
        },
        {
            name: "description",
            type: "textarea",
            label: "Description",
        },
		{
			name: "selectedMembers",
			type: "relationship",
			relationTo: "team-members",
			hasMany: true,
			required: true,
			label: "Select Team Members",
		},
	],
};
