module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	plugins: ["prettier"],
	extends: [
		"plugin:vue/vue3-essential",
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"@vue/prettier",
		"plugin:vue/vue3-essential",
		"@vue/eslint-config-typescript",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"prettier/prettier": "error",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": "error",
		quotes: [1, "double"],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-namespace": "off",
		"vue/multi-word-component-names": "off",
		"vue/require-default-prop": "off",
	},
};
