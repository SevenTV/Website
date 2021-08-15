module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "at-rule-no-unknown": null,
    "no-descending-specificity": null,
    "selector-pseudo-element-colon-notation": null,
    "declaration-empty-line-before": null,
  },
};
