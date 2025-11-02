import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current timestamp
const now = new Date().toISOString();

// Create new metadata
const metadata = {
  lastUpdated: {
    es: now,
    en: now
  },
  version: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
  notes: {
    es: "Actualización manual - " + new Date().toLocaleDateString('es-ES'),
    en: "Manual update - " + new Date().toLocaleDateString('en-US')
  }
};

// Write to public directory for static access
const metadataPath = path.join(__dirname, 'public', 'cv', 'cv-metadata.json');

// Ensure the directory exists
const dir = path.dirname(metadataPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

console.log('CV metadata updated successfully!');
console.log('New version:', metadata.version);
console.log('Updated at:', now);
console.log('File saved to:', metadataPath);
