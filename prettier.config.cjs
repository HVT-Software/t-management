/** @type {import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  jsxSingleQuote: true,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: "none",
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/.", "^[./]", ".css"],
  importOrderSeparation: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrderParserPlugins: ["classProperties", '["decorators", { "decoratorsBeforeExport": true }]', "typescript", "jsx"]
};
