#!/usr/bin/env node
/**
 * Convert all JPEG/JPG/PNG images to WebP.
 *
 * Usage:
 *   node scripts/convert-to-webp.mjs [sourceDir] [outDir] [--quality=80]
 *
 * Defaults: sourceDir="public", outDir="optimized"
 * The source directory tree is mirrored inside outDir.
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split("=");
      return [k, v ?? true];
    })
);

const sourceDir = path.resolve(projectRoot, positional[0] ?? "public");
const outDir = path.resolve(projectRoot, positional[1] ?? "optimized");
const quality = Number(flags.quality ?? 80);

const CONVERTIBLE = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    // Don't recurse into the output folder if it lives inside the source.
    if (path.resolve(full) === outDir) continue;
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function main() {
  try {
    await stat(sourceDir);
  } catch {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let savedBytes = 0;

  for await (const file of walk(sourceDir)) {
    const ext = path.extname(file).toLowerCase();
    if (!CONVERTIBLE.has(ext)) {
      skipped++;
      continue;
    }

    const rel = path.relative(sourceDir, file);
    const destRel = rel.slice(0, -ext.length) + ".webp";
    const dest = path.join(outDir, destRel);

    try {
      await mkdir(path.dirname(dest), { recursive: true });
      const info = await sharp(file)
        .webp({ quality, effort: 6 })
        .toFile(dest);

      const srcSize = (await stat(file)).size;
      const diff = srcSize - info.size;
      savedBytes += diff;
      converted++;

      const pct = ((diff / srcSize) * 100).toFixed(1);
      console.log(
        `✓ ${rel} → ${destRel}  (${fmt(srcSize)} → ${fmt(info.size)}, -${pct}%)`
      );
    } catch (err) {
      failed++;
      console.error(`✗ Failed: ${rel} — ${err.message}`);
    }
  }

  console.log("\n--------------------------------------------------");
  console.log(`Converted: ${converted}`);
  console.log(`Skipped (non-image): ${skipped}`);
  if (failed) console.log(`Failed: ${failed}`);
  console.log(`Total saved: ${fmt(savedBytes)}`);
  console.log(`Output: ${path.relative(projectRoot, outDir)}/`);
}

function fmt(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

main();
