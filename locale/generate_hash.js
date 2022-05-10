const { join, basename } = require("path");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { createHash } = require("crypto");

const hashes = {};

const files = readdirSync(__dirname);
files.sort().forEach((file) => {
	const fullFile = join(__dirname, file);
	if (fullFile === __filename || file === "manifest.json" || file === "type.ts") return;

	const hashSum = createHash("sha256");
	const fileBuffer = readFileSync(fullFile);
	hashSum.update(fileBuffer);
	const hex = hashSum.digest("hex");

	hashes[basename(file, ".ts")] = {
		hash: hex,
		name: JSON.parse(
			eval(`JSON.stringify(${fileBuffer.toString().replace("export default", "").replace(";", "")})`),
		).locale,
	};
});

writeFileSync(join(__dirname, "manifest.json"), JSON.stringify(hashes));
