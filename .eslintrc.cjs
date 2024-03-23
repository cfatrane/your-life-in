module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh", "prettier"],
  rules: {
    // C
    camelcase: "warn",
    "capitalized-comments": "off",
    // D
    "default-param-last": ["error"],
    // E
    eqeqeq: "error",
    // I
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "object",
          "type",
          "index",
          "unknown",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "vite",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/api/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/asset/s**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/components/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/constants/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/helpers/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/pages/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/redux/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/routes/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/type/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/utils/**",
            group: "internal",
            position: "after",
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          orderImportKind: "asc",
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        warnOnUnassignedImports: true,
      },
    ],
    // P
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "*", next: "block-like" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "prefer-const": "error",
    "prefer-object-spread": "warn",
    // M
    "max-params": ["warn", 3],
    // N
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-empty-function": "warn",
    "no-param-reassign": "error",
    // R
    "require-await": "error",
    // S
    "sort-keys": ["warn", "asc"],
    "sort-vars": "error",
    "sort-imports": ["off"],
    // React
    "react/jsx-newline": "warn",
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-sort-props": ["warn", { ignoreCase: true }],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: true,
    },
    react: {
      version: "detect",
    },
  },
};
