import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["public/js/md5.js"]
  },
  js.configs.recommended,
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: globals.browser
    },
    rules: {
        "no-unused-vars": "off"
    }
  }
];