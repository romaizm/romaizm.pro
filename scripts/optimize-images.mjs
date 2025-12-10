import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const PUBLIC_DIR = "./public";
const QUALITY = 80; // WebP quality (0-100)
const MAX_WIDTH = 1920; // Max width for hero images
const THUMBNAIL_MAX_WIDTH = 800; // Max width for thumbnails

async function getAllImages(dir, images = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await getAllImages(fullPath, images);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

async function getFileSize(path) {
  const stats = await stat(path);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

async function optimizeImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const dir = inputPath.substring(0, inputPath.lastIndexOf("/"));
  const isThumbnail = name.includes("thumbnail");
  const maxWidth = isThumbnail ? THUMBNAIL_MAX_WIDTH : MAX_WIDTH;

  const originalSize = await getFileSize(inputPath);

  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  const needsResize = metadata.width > maxWidth;

  let pipeline = sharp(inputPath);

  // Resize if needed
  if (needsResize) {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  // For JPG/PNG, convert to WebP
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const outputPath = join(dir, `${name}.webp`);
    await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

    const newSize = await getFileSize(outputPath);
    const saved = originalSize - newSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);

    console.log(
      `✓ ${inputPath} → .webp | ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${percent}% saved)`
    );

    // Delete original JPG/PNG
    await unlink(inputPath);
    return { originalSize, newSize, converted: true };
  }

  // For WebP, re-compress in place
  if (ext === ".webp") {
    const tempPath = join(dir, `${name}_temp.webp`);
    await pipeline.webp({ quality: QUALITY }).toFile(tempPath);

    const newSize = await getFileSize(tempPath);

    // Only replace if smaller
    if (newSize < originalSize) {
      await unlink(inputPath);
      const { rename } = await import("fs/promises");
      await rename(tempPath, inputPath);

      const saved = originalSize - newSize;
      const percent = ((saved / originalSize) * 100).toFixed(1);
      console.log(
        `✓ ${inputPath} | ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${percent}% saved)`
      );
      return { originalSize, newSize, converted: false };
    } else {
      await unlink(tempPath);
      console.log(`- ${inputPath} | ${formatBytes(originalSize)} (already optimal)`);
      return { originalSize, newSize: originalSize, converted: false };
    }
  }

  return { originalSize, newSize: originalSize, converted: false };
}

async function main() {
  console.log("🖼️  Image Optimization Script\n");
  console.log(`Quality: ${QUALITY}%, Max width: ${MAX_WIDTH}px (thumbnails: ${THUMBNAIL_MAX_WIDTH}px)\n`);

  const images = await getAllImages(join(PUBLIC_DIR, "images"));
  console.log(`Found ${images.length} images\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let converted = 0;

  for (const img of images) {
    try {
      const result = await optimizeImage(img);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      if (result.converted) converted++;
    } catch (err) {
      console.error(`✗ ${img}: ${err.message}`);
    }
  }

  const totalSaved = totalOriginal - totalNew;
  const totalPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);

  console.log("\n" + "=".repeat(60));
  console.log(`Total: ${formatBytes(totalOriginal)} → ${formatBytes(totalNew)}`);
  console.log(`Saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
  console.log(`Converted to WebP: ${converted} files`);
}

main().catch(console.error);
