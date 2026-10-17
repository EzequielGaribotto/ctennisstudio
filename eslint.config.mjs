import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import security from "eslint-plugin-security";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: [".next/**", ".next-build/**", "out/**", "node_modules/**", "next-env.d.ts", "fotos-nuevas/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Security rules for the website code that runs for visitors (eval, unsafe regex,
  // object-key injection, timing attacks...). The scripts/ folder only runs on the owner's own
  // files on his computer, so these rules don't apply there.
  { ...security.configs.recommended, files: ["src/**/*.{ts,tsx}", "next.config.js"] },
];

export default eslintConfig;
