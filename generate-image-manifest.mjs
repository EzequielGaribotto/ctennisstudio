import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tournamentsDir = path.join(__dirname, 'public', 'images', 'stringer', 'tournaments');
const outputFile = path.join(__dirname, 'src', 'data', 'tournament-images.json');

// Read all files from tournaments directory
const files = fs.readdirSync(tournamentsDir)
  .filter(file => file.endsWith('.webp'))
  .map(file => `/images/stringer/tournaments/${file}`);

// Group by tournament ID
const manifest = {};

files.forEach(filePath => {
  // Extract tournament code from filename (e.g., "MUTUA MADRID 2025 0.webp")
  const filename = path.basename(filePath);
  const match = filename.match(/^(\w+)\s/);
  
  if (match) {
    const tournamentCode = match[1];
    if (!manifest[tournamentCode]) {
      manifest[tournamentCode] = [];
    }
    manifest[tournamentCode].push(filePath);
  }
});

// Sort each tournament's images (newest first, by year and index)
Object.keys(manifest).forEach(code => {
  manifest[code].sort((a, b) => {
    const matchA = a.match(/(\d{4})\s(\d+)\.webp$/);
    const matchB = b.match(/(\d{4})\s(\d+)\.webp$/);
    
    if (matchA && matchB) {
      const yearDiff = parseInt(matchB[1]) - parseInt(matchA[1]);
      if (yearDiff !== 0) return yearDiff;
      return parseInt(matchA[2]) - parseInt(matchB[2]);
    }
    return 0;
  });
});

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write manifest
fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

console.log('✅ Tournament image manifest generated!');
console.log(`   Total images: ${files.length}`);
console.log(`   Tournaments: ${Object.keys(manifest).length}`);
