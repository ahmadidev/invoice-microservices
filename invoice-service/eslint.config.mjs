import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["src/tests/**/*.ts"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];