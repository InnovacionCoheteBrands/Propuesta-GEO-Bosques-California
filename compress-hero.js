import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'public/Nuevas imágenes/HERO - SECTION.webp';
const outputPath = 'public/images/hero-new-section.webp';

async function compressHero() {
  if (fs.existsSync(inputPath)) {
    console.log(`Compressing ${inputPath} -> ${outputPath}...`);
    try {
      await sharp(inputPath)
        .webp({ quality: 75 })
        .toFile(outputPath);
      console.log(`Finished ${outputPath}`);
    } catch (err) {
      console.error(`Error compressing:`, err);
    }
  } else {
    console.log('Input file not found.');
  }
}

compressHero();
