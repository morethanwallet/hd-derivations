import { type Linter, type ESLint } from "eslint";
import tsParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginFilenames from "eslint-plugin-filenames";
import prettierConfig from "./prettier.config.cjs";

const config: Linter.Config[] = [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin as unknown as ESLint.Plugin,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
      filenames: eslintPluginFilenames as unknown as ESLint.Plugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
          "newlines-between": "always",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      "prettier/prettier": ["error", prettierConfig],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
    ignores: ["node_modules"],
  },
];

export default config;
