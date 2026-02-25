import fs from 'fs';
import path from 'path';

/**
 * This file dynamically exports all image files found in the current directory.
 * It filters for common image extensions and excludes index files.
 */

const currentDir = __dirname;
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

const files = fs.readdirSync(currentDir);

files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);

  // Skip index files and non-image files
  if (name !== 'index' && imageExtensions.includes(ext)) {
    // Export using the filename as the alias
    // Note: In a standard ESM environment, dynamic exports like this 
    // usually require a build step or a specific loader.
    module.exports[name] = require(`./${file}`);
  }
});
