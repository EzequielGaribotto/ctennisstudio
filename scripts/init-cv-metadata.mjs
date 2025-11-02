import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const cvDirectory = path.join(projectRoot, 'public', 'cv');
const metadataPath = path.join(cvDirectory, 'cv-metadata.json');

// CV files to check
const cvFiles = [
  path.join(cvDirectory, 'CV_ES_EzequielGaribotto.pdf'),
  path.join(cvDirectory, 'CV_EN_EzequielGaribotto.pdf')
];

function initializeMetadata() {
  // Check if CV files exist
  const existingFiles = cvFiles.filter(file => fs.existsSync(file));
  
  if (existingFiles.length === 0) {
    console.log('⚠️  No CV files found. Please add your CV files to the public/cv directory:');
    console.log('   - CV_ES_EzequielGaribotto.pdf');
    console.log('   - CV_EN_EzequielGaribotto.pdf');
    return;
  }

  // Get the latest modification time from existing CV files
  let latestModified = new Date(0);
  for (const file of existingFiles) {
    const stat = fs.statSync(file);
    if (stat.mtime > latestModified) {
      latestModified = stat.mtime;
    }
  }

  // Use the latest modification time or current time
  const updateTime = latestModified > new Date(0) ? latestModified.toISOString() : new Date().toISOString();
  const version = new Date(updateTime).toISOString().split('T')[0].replace(/-/g, '.');

  const metadata = {
    lastUpdated: {
      es: updateTime,
      en: updateTime
    },
    version: version,
    notes: {
      es: `Inicialización automática basada en archivos CV existentes`,
      en: `Automatic initialization based on existing CV files`
    }
  };

  // Ensure directory exists
  if (!fs.existsSync(cvDirectory)) {
    fs.mkdirSync(cvDirectory, { recursive: true });
  }

  try {
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('✅ CV metadata initialized successfully!');
    console.log(`   Found ${existingFiles.length} CV file(s)`);
    console.log(`   Version: ${version}`);
    console.log(`   Last updated: ${new Date(updateTime).toLocaleString()}`);
  } catch (error) {
    console.error('❌ Error initializing CV metadata:', error);
  }
}

// Run initialization
initializeMetadata();
