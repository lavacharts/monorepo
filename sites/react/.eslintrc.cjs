/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    emcaVersion: "2020",
    sourceType: "module"
  },
  env: {
    es6: true,
    node: true
  },
  plugins: ["import", "prettier", "@typescript-eslint", "simple-import-sort"],
  extends: [
    "../../.eslintrc.cjs"
  ]
};
