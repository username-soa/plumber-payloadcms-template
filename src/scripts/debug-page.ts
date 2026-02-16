import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const loadEnv = () => {
	try {
		const envPath = path.resolve(process.cwd(), ".env.local");
		if (fs.existsSync(envPath)) {
			const envFile = fs.readFileSync(envPath, "utf8");
			envFile.split("\n").forEach((line) => {
				const [key, ...values] = line.split("=");
				const value = values.join("=");
				if (key && value) {
					process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
				}
			});
			console.log("Loaded .env.local");
		} else {
			console.log(".env.local not found at", envPath);
		}
	} catch (e) {
		console.error("Failed to load .env.local", e);
	}
};

const debug = async () => {
	loadEnv();

	if (!process.env.DATABASE_URL) {
		console.error("DATABASE_URL is missing!");
		return;
	}
	console.log(
		"DATABASE_URL is set (starts with):",
		process.env.DATABASE_URL.substring(0, 15),
	);

	const { getPayload } = await import("payload");
	const { default: configPromise } = await import("@payload-config");

	const payload = await getPayload({ config: configPromise });

	try {
		console.log("Attempting to fetch Page with ID 1 (draft=true)...");
		const page = await payload.findByID({
			collection: "pages",
			id: 1,
			depth: 0,
			draft: true,
		});
		console.log("Page found:", JSON.stringify(page, null, 2));
	} catch (error) {
		console.error("Error fetching page:");
		console.error(error);
	}

	process.exit(0);
};

debug();
