/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    emcaVersion: "2020",
    sourceType: "module",

  },
  env: {
    es6: true,
    node: true
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  plugins: ["import", "prettier", "@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error",

    //
    // simple-import-sort
    //

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    //
    // eslint-plugin-import
    //

    "import/namespace": "off", // SUPER DUPER SLOW, why?
    "import/default": "off" // ALSO SLOW, why?
  }
};
