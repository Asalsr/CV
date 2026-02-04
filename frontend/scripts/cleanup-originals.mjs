import fs from 'fs/promises';
import path from 'path';

const ART_DIR = './public/art';

async function getOriginalFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getOriginalFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(entry.name)) {
      // Check if WebP version exists
      const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      try {
        await fs.access(webpPath);
        files.push(fullPath); // WebP exists, safe to delete original
      } catch {
        console.log(`⚠️  Keeping ${entry.name} - no WebP version found`);
      }
    }
  }
  return files;
}

async function main() {
  console.log('🧹 Cleanup Original Images Script');
  console.log('==================================\n');

  const files = await getOriginalFiles(ART_DIR);
  console.log(`Found ${files.length} original files to remove (WebP versions exist)\n`);

  let totalSize = 0;
  for (const file of files) {
    const stats = await fs.stat(file);
    totalSize += stats.size;
    await fs.unlink(file);
    console.log(`✓ Deleted: ${path.basename(file)}`);
  }

  console.log('\n==================================');
  console.log(`📊 Freed ${(totalSize / 1024 / 1024).toFixed(1)}MB of disk space`);
  console.log('✅ Done! Only WebP files remain.');
}

main().catch(console.error);
