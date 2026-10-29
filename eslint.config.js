import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "public"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Keep components and modules small: split anything past ~150 lines.
      "max-lines": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
      // Booleans read as questions: isOpen, hasFailed, shouldRetry…
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["variable", "parameter"],
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "should", "can", "did"],
        },
      ],
    },
  },
  {
    // Artwork traced into path data, not code.
    files: ["src/features/loading/starWandPaths.ts"],
    rules: { "max-lines": "off" },
  },
  prettier,
);
