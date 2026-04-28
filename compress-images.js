import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/Nuevas imágenes';
const outputDir = 'public/images';
const files = fs.readdirSync(dir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function compress() {
  for (const file of files) {
    if (file.endsWith('.webp')) {
      const filePath = path.join(dir, file);
      let outputName = file.toLowerCase()
        .replace(/modelos de casa - /g, 'model-')
        .replace(/ /g, '-')
        .replace('.webp', '-new.webp');
      
      const outputPath = path.join(outputDir, outputName);
      
      console.log(`Compressing ${file} -> ${outputName}...`);
      try {
        await sharp(filePath)
          .webp({ quality: 75 })
          .toFile(outputPath);
        
        console.log(`Finished ${outputName}`);
      } catch (err) {
        console.error(`Error compressing ${file}:`, err);
      }
    }
  }
}

compress();
