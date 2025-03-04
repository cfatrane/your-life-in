import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/components/ui/**/*"],
}, ...fixupConfigRules(compat.extends(
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
)), {
    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },

    rules: {
        camelcase: "warn",
        "capitalized-comments": "off",
        "default-param-last": ["error"],
        eqeqeq: "error",
        "max-params": ["warn", 3],

        "no-console": ["warn", {
            allow: ["warn", "error"],
        }],

        "no-empty-function": "warn",
        "no-param-reassign": "error",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: "*",
            next: "return",
        }, {
            blankLine: "always",
            prev: "*",
            next: "function",
        }, {
            blankLine: "always",
            prev: "*",
            next: "block-like",
        }, {
            blankLine: "always",
            prev: ["import"],
            next: "*",
        }, {
            blankLine: "any",
            prev: ["import"],
            next: ["import"],
        }, {
            blankLine: "always",
            prev: ["const", "let", "var"],
            next: "*",
        }, {
            blankLine: "any",
            prev: ["const", "let", "var"],
            next: ["const", "let", "var"],
        }],

        "prefer-const": "error",
        "prefer-destructuring": "error",
        "prefer-object-spread": "warn",

        "sort-keys": ["off", "asc", {
            natural: true,
            minKeys: 5,
        }],

        "sort-vars": "error",
        "react/boolean-prop-naming": ["warn"],
        "react/jsx-newline": ["warn"],

        "react/jsx-no-useless-fragment": ["error", {
            allowExpressions: true,
        }],

        "react/jsx-sort-props": ["warn", {
            ignoreCase: true,
        }],
    },
}];