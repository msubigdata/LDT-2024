// @ts-check

const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");
const projectNode = resolve(__dirname, "tsconfig.node.json");

/** @type {import('eslint').Linter.Config}*/
module.exports = {
  root: true,
  parserOptions: {
    project: [project, projectNode],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: [project, projectNode],
      },
    },
    "jsx-a11y": {
      components: {},
    },
    "tailwindcss": {
      callees: ["cva", "cn"],
    },
  },
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: ["react-refresh", "@tanstack/query"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/explicit-function-return-type": "off", // type inference is good enough
    "import/order": "off", // this is handled by `@ianvs/prettier-plugin-sort-imports`
    "no-console": [
      "error",
      {
        allow: ["info", "error", "warn"],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: true,
      },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
      },
    ],
  },
  overrides: [{ files: ["vite.config.ts"], rules: { "import/no-default-export": "off" } }],
};
