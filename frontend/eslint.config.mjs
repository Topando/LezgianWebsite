import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", "./src"],
            ["@widgets", "./src/widgets"], 
            ["@shared", "./src/shared"],
            ["@features", "./src/features"], 
            ["@pages", "./src/pages"], 
            ["@app", "./src/app"],
            ["@styles", "./src/styles"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  }
];

export default eslintConfig;
