import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import packageJson from "./package.json" with { type: "json" };
import postcssDiscardEmpty from "postcss-discard-empty";
import path from "path";

// Plugin custom pour intercepter les imports d'images.
// Retourne un module JS qui exporte le chemin relatif vers dist/images/.
const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

function imagePlugin() {
  return {
    name: 'image-path-plugin',
    load(id) {
      const ext = path.extname(id).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const fileName = path.basename(id);
        // Exporte un simple string : le nom du fichier image
        return `export default "${fileName}";`;
      }
      return null;
    }
  };
}

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: [
      "react",
      "react-dom",
      "nextjs",
      "next/image",
      "next/link",
      "postcss",
      "autoprefixer",
      "tailwindcss",
      "@emotion/is-prop-valid",
    ],
    plugins: [
      imagePlugin(),
      resolve({
        ignoreGlobal: false,
        include: ['node_modules/**'],
        skip: ['react', 'react-dom', 'fs'],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      copy({
        targets: [
            { src: "src/assets/fonts", dest: "dist/assets" },
            { src: "src/images/*.png", dest: "dist/images" },
            { src: "src/images/*.jpg", dest: "dist/images" },
            { src: "src/images/*.jpeg", dest: "dist/images" },
            { src: "src/images/*.svg", dest: "dist/images" },
            { src: "src/images/*.webp", dest: "dist/images" },
        ],
      }),
      postcss({
        extract: true, 
        minimize: true,
      }),
    ],
  },
  {
    input: "src/styles/main.css",
    output: [{ file: "dist/styles/index.css", format: "es" }],
    plugins: [
        postcss({
            extract: true,
            minimize: true,
            plugins: [postcssDiscardEmpty()],
        }),
    ],
  },
  {

    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];