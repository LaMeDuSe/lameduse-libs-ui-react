import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import packageJson from "./package.json" with { type: "json" };
import postcssDiscardEmpty from "postcss-discard-empty";
import url from '@rollup/plugin-url';

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
      resolve({
        ignoreGlobal: false,
        include: ['node_modules/**'],
        skip: ['react', 'react-dom', 'fs'],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      copy({
        targets: [
            // Need to copy the files over for usage
            { src: "src/assets/fonts", dest: "dist/assets" },
        ],
      }),
      postcss({
        extract: true, 
        minimize: true,
      }),
      url({
        include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.webp'],
        // On ne veut PAS inclure les images en base64 dans le bundle JS.
        // On met une limite à 0 pour que les images soient copiées dans `dist` plutôt qu'inlinées.
        limit: 0,
        emitFiles: true, // S'assure que les fichiers sont émis.
        fileName: '[name][extname]', // Conserve le nom de fichier original.
        destDir: 'dist/images', // Copie toutes les images dans `dist/images`.
        publicPath: '/images/', // Le chemin qui sera utilisé dans le code (ex: `import img from './foo.png'` -> `const img = '/images/foo.png'`)
      })
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