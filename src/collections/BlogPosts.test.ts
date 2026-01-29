import { BlogPosts } from "./BlogPosts";

describe("Blog Posts Collection Properties", () => {
	it("Property 1: Blog Post Schema Validation", () => {
		// Validates Requirements 2.1-2.9
		const fields = BlogPosts.fields.map((f) => ("name" in f ? f.name : ""));
		const requiredFields = [
			"title",
			"slug",
			"status",
			"category",
			"summary",
			"featured",
			"publishedAt",
			"author",
			"featuredImage",
			"content",
		];

		requiredFields.forEach((field) => {
			expect(fields).toContain(field);
		});

		const slugField = BlogPosts.fields.find(
			(f) => "name" in f && f.name === "slug",
		);
		expect(slugField).toHaveProperty("hooks.beforeValidate");
	});
});
