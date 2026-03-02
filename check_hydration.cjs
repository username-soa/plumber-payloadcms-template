const { chromium } = require("playwright");
(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	const errors = [];

	page.on("console", (msg) => {
		if (msg.type() === "error") {
			errors.push("CONSOLE ERROR: " + msg.text());
		}
		if (msg.text().includes("Hydration")) {
			console.log("\n--- HYDRATION TRACE FOUND ---");
			console.log(msg.text());
		}
	});

	page.on("pageerror", (err) => {
		errors.push("PAGE ERROR: " + err.message + "\n" + err.stack);
		if (err.message.includes("Hydration") || err.message.includes("match")) {
			console.log("\n--- UNCAUGHT HYDRATION ERROR ---");
			console.log(err.message);
			console.log(err.stack);
		}
	});

	try {
		await page.goto("http://localhost:3000/about", {
			waitUntil: "networkidle",
			timeout: 15000,
		});
		console.log("\n--- ALL CAPTURED ERRORS ---");
		console.log(errors.join("\n\n"));
	} catch (e) {
		console.log("Failed to load page:", e);
	}

	await browser.close();
})();
