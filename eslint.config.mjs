import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

export default defineConfig([
  globalIgnores([".husky/*", "dist/*"]),
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...ts.configs.recommended,
  eslintPluginPrettierRecommended,
]);
