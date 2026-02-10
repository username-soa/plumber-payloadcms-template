import { getPayload } from "payload";
import config from "./payload.config";

const run = async () => {
	console.log("--- STARTING TEST ---");
	try {
		const payload = await getPayload({ config });
		console.log("Payload initialized successfully");
	} catch (e) {
		console.error("Payload init failed:", e);
	}
	console.log("--- ENDING TEST ---");
	process.exit(0);
};

run();
