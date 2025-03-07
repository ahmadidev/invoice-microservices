import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["src/**/*.ts"]},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];