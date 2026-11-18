import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import packageJson from "./package.json" with { type: "json" };
import postcssDiscardEmpty from "postcss-discard-empty";
import path from "path";
import { builtinModules } from "module";

// Modules laissés externes (jamais embarqués dans le bundle) : tout ce que le paquet déclare en
// `dependencies` / `peerDependencies`, sous-chemins compris (react/jsx-runtime, react-dom/client,
// next/image, @heroicons/react/24/solid, framer-motion…), plus les modules Node (fs, path).
// Une liste de noms exacts ne suffit pas : `react/jsx-runtime`, importé par framer-motion, était
// embarqué en version React 18 et le bundle plantait sous React 19 (Next 15/16, App Router) avec
// « Cannot read properties of undefined (reading 'ReactCurrentDispatcher') ».
const externalPackages = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];
const nodeBuiltins = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)]);

function isExternal(id) {
  // Les feuilles de style importées (ex. react-alice-carousel/lib/alice-carousel.css) restent
  // traitées par PostCSS et extraites dans dist/, comme avant.
  if (/\.css$/i.test(id)) return false;
  return nodeBuiltins.has(id) || externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
}

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
    external: isExternal,
    plugins: [
      imagePlugin(),
      // Les anciennes options (include, skip, ignoreGlobal) n'existent plus dans
      // @rollup/plugin-node-resolve v15 et étaient ignorées : l'exclusion passe par `external`.
      resolve(),
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