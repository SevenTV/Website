// @ts-nocheck
import { join, basename } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";

const hashes = {};

const files = readdirSync(__dirname);

Promise.all(
	files.sort().map(async (file) => {
		const fullFile = join(__dirname, file);

		if (fullFile === __filename || !file.includes(".ts") || file === "type.ts" || file === "manifest.ts") return;

		const hashSum = createHash("sha256");
		const fileBuffer = readFileSync(fullFile);
		hashSum.update(fileBuffer);
		const hex = hashSum.digest("hex");

		const { locale } = await import(fullFile).then((m) => m.default);

		hashes[basename(file, ".ts")] = {
			hash: hex,
			name: locale,
		};
	}),
).then(() => {
	writeFileSync(
		join(__dirname, "manifest.ts"),
		`export default ${JSON.stringify(hashes)} as { [key: string]: { hash: string; name: string } };`,
	);
});
