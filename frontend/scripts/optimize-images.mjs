import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const ART_DIR = './public/art';
const QUALITY = 82; // Good balance between quality and size
const MAX_WIDTH = 1920; // Max width for images
const MAX_HEIGHT = 1440; // Max height for images

async function getImageFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;

    // Read image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Calculate new dimensions (maintain aspect ratio)
    let width = metadata.width;
    let height = metadata.height;

    if (width > MAX_WIDTH) {
      height = Math.round(height * (MAX_WIDTH / width));
      width = MAX_WIDTH;
    }
    if (height > MAX_HEIGHT) {
      width = Math.round(width * (MAX_HEIGHT / height));
      height = MAX_HEIGHT;
    }

    // Generate WebP version
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await image
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    const newSize = webpStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.basename(filePath)} -> ${path.basename(webpPath)}`);
    console.log(`  ${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (${savings}% smaller)`);

    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return { original: 0, optimized: 0 };
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');

  const files = await getImageFiles(ART_DIR);
  console.log(`Found ${files.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    totalOriginal += result.original;
    totalOptimized += result.optimized;
  }

  console.log('\n============================');
  console.log('📊 Summary:');
  console.log(`   Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Total savings: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(1)}MB (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('\n✅ Done! WebP versions created alongside originals.');
  console.log('   Update your code to use .webp extensions for better performance.');
}

main().catch(console.error);
