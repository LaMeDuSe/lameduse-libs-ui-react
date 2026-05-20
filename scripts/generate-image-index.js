const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../src/images');
const outputFile = path.join(imageDir, 'index.ts');
const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];

const header = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n// Run "yarn generate-images" to regenerate.\n\n`;

const files = fs.readdirSync(imageDir);

let imports = '';
let imageMap = 'const images: { [key: string]: any } = {\n';

// Helper to convert a filename to a valid PascalCase variable name
const toPascalCase = (str) => {
  const camelCase = str.replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : '');
  const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  // Prepend underscore if it starts with a number (which is not a valid variable start)
  return /^[0-9]/.test(pascalCase) ? `_${pascalCase}` : pascalCase;
};

files.forEach(file => {
    const extension = path.extname(file).toLowerCase();
    if (imageExtensions.includes(extension) && file !== 'index.ts') {
        const baseName = path.basename(file, path.extname(file));
        const varName = toPascalCase(baseName);
        
        imports += `import ${varName} from './${file}';\n`;
        imageMap += `  '${baseName}': ${varName},\n`;
    }
});

imageMap += '};\n\nexport default images;\n';

const fileContent = header + imports + '\n' + imageMap;

fs.writeFileSync(outputFile, fileContent);
console.log(`✅ Successfully generated ${path.relative(process.cwd(), outputFile)}`);