import { CaseStudies } from "./CaseStudies";

describe("Case Studies Collection Properties", () => {
	it("Property 2: Case Study Schema Validation", () => {
		// Validates Requirements 3.1, 3.2, 3.5, 3.6, 3.14, 3.16
		const fields = CaseStudies.fields.map((f) => ("name" in f ? f.name : ""));
		const requiredFields = [
			"title",
			"slug",
			"client",
			"location",
			"category",
			"completedAt",
			"summary",
			"featured",
			"featuredImage",
			"gallery",
			"challenge",
			"solution",
			"results",
			"content",
			"testimonial",
		];

		requiredFields.forEach((field) => {
			expect(fields).toContain(field);
		});

		const slugField = CaseStudies.fields.find(
			(f) => "name" in f && f.name === "slug",
		);
		expect(slugField).toHaveProperty("hooks.beforeValidate");
	});
});
