import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local if exists, otherwise .env
const envLocal = path.resolve(__dirname, "../../.env.local");
const env = path.resolve(__dirname, "../../.env");

if (fs.existsSync(envLocal)) {
	console.log("Loading .env.local");
	config({ path: envLocal });
} else if (fs.existsSync(env)) {
	console.log("Loading .env");
	config({ path: env });
}

// Import the script provided as argument
const scriptPath = process.argv[2];
if (!scriptPath) {
	console.error("Please provide a script to run");
	process.exit(1);
}

import(path.resolve(process.cwd(), scriptPath));
