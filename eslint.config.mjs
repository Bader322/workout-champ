import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  {
    ignores: [
      ".config/",
      "dist/",
      "tsconfig.json",
      "node_modules", // Ignore specific files and directories
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",

      // Ignore specific file types
      "**/*.d.ts",
      "**/*.config.js",
      "**/*.config.mjs",

      // Ignore specific patterns
      "**/.*",
      "**/*.log",

      // Next.js specific ignores
      ".vercel/**",
      ".turbo/**",
    ],
  },
  ...compat.config({
    extends: ["next", "prettier", "next/core-web-vitals"],
    rules: {
      // Quote-related rules
      quotes: [
        "error",
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],

      // Additional quote-related configuration
      "jsx-quotes": ["error", "prefer-single"],
      semi: ["error"],
      "prefer-const": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      // Custom rules if needed
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^__turbopack",
          argsIgnorePattern: "^__turbopack",
        },
      ],
    },
  }),
];
export default eslintConfig;
