import { Media } from "./Media";

describe("Media Collection Properties", () => {
	it("Property 4: Image Upload and Size Generation", () => {
		// Validates Requirement 5.2, 5.3
		expect(Media.upload).toBeDefined();
		// @ts-ignore
		expect(Media.upload.imageSizes).toHaveLength(3);
		// @ts-ignore
		const sizes = Media.upload.imageSizes.map((s) => s.name);
		expect(sizes).toContain("thumbnail");
		expect(sizes).toContain("card");
		expect(sizes).toContain("tablet");
	});

	it("Property 5: Media Schema Validation", () => {
		// Validates Requirement 5.4, 5.5
		const fieldNames = Media.fields.map((f) => ("name" in f ? f.name : ""));
		expect(fieldNames).toContain("alt");
		expect(fieldNames).toContain("caption");

		const altField = Media.fields.find((f) => "name" in f && f.name === "alt");
		expect(altField).toHaveProperty("required", true);
	});

	it("Property 6: Image Type Validation", () => {
		// Validates Requirement 5.7
		// @ts-ignore
		expect(Media.upload.mimeTypes).toContain("image/*");
	});
});
