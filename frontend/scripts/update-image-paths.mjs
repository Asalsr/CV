import fs from 'fs/promises';

const FILE_PATH = './src/app/art/page.tsx';

async function main() {
  let content = await fs.readFile(FILE_PATH, 'utf-8');

  // Replace local image extensions with .webp (but not external URLs)
  // Match /art/ paths with .jpg, .JPG, .jpeg, .JPEG, .png, .PNG extensions
  content = content.replace(
    /('\/art\/[^']+)\.(jpg|JPG|jpeg|JPEG|png|PNG)'/g,
    "$1.webp'"
  );

  await fs.writeFile(FILE_PATH, content);
  console.log('✅ Updated all local image paths to .webp');
}

main().catch(console.error);
