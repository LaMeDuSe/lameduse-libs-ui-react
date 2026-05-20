import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Source : Le dossier dist/images à l'intérieur de la librairie elle-même
// On remonte d'un cran car on est dans /scripts
const src = resolve(__dirname, '../dist/images');

// Destination : Le dossier public du projet qui installe la librairie
// process.env.INIT_CWD correspond au dossier où la commande 'yarn add' a été lancée
const projectRoot = process.env.INIT_CWD || resolve(__dirname, '../../..');
const dest = join(projectRoot, 'public/images/lib');

// On vérifie que la source existe (le build a été fait) et qu'on n'est pas en train de dev sur la lib elle-même
if (existsSync(src) && !projectRoot.includes('lameduse-libs-ui-react')) {
  try {
    mkdirSync(dest, { recursive: true });
    cpSync(src, dest, { recursive: true });
    console.log(`✅ [LaMeDuSe UI] Images installées dans ${dest}`);
  } catch (e) {
    console.warn(`⚠️ [LaMeDuSe UI] Impossible de copier les images : ${e.message}`);
  }
}