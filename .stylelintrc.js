module.exports = {
	plugins: ["stylelint-scss"],
	extends: [
		"stylelint-config-standard",
		"stylelint-config-prettier",
		"stylelint-config-recommended-scss",
		"stylelint-config-recommended-vue",
	],
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		"annotation-no-unknown": null,
		"at-rule-no-unknown": null,
		"color-function-notation": null,
		"declaration-block-no-redundant-longhand-properties": null,
		"declaration-empty-line-before": null,
		"function-no-unknown": null,
		"import-notation": null,
		"keyframes-name-pattern": null,
		"no-descending-specificity": null,
		"no-empty-source": null,
		"property-no-vendor-prefix": null,
		"rule-empty-line-before": null,
		"scss/at-import-partial-extension": null,
		"scss/no-global-function-names": null,
		"selector-class-pattern": null,
		"selector-pseudo-element-colon-notation": null,
		"value-keyword-case": null,
	},
	ignoreFiles: ["locale/*.ts"],
};
