/**
 * This file dynamically creates an object containing all images from this directory.
 * It uses Webpack's `require.context` to achieve this at build time, making
 * it possible to import all images with a single statement.
 * It excludes itself ('index.ts').
 */

interface ImageMap {
  [key: string]: any;
}

function importAll(r: any): ImageMap {
  const images: ImageMap = {};
  r.keys().forEach((item: string) => {
    // remove './' and file extension from the key
    const key = item.replace('./', '').replace(/\.(png|jpe?g|gif|svg|webp)$/, '');
    images[key] = r(item);
  });
  return images;
}

// The 'require.context' function is a special feature from Webpack.
let context: any;
try {
  context = (require as any).context('./', false, /\.(png|jpe?g|gif|svg|webp)$/);
} catch (error) {
  // Fallback for environments where require.context is not available (e.g. tests)
  context = () => null;
  context.keys = () => [];
}

const images = importAll(context);

export default images;
