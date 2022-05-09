const { join, basename } = require("path");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { createHash } = require("crypto");

console.log(__filename);

const hashes = {};

const files = readdirSync(__dirname);
files.sort().forEach((file) => {
	const fullFile = join(__dirname, file);
	if (fullFile === __filename || fullFile === join(__dirname, "locale.json")) return;

	const hashSum = createHash("sha256");
	const fileBuffer = readFileSync(fullFile);
	hashSum.update(fileBuffer);
	const hex = hashSum.digest("hex");
	hashes[basename(file, ".ts")] = hex;
});

writeFileSync(join(__dirname, "locale.json"), JSON.stringify(hashes));
