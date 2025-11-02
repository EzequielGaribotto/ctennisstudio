import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const projectRoot = path.join(__dirname, '..');
const cvDirectory = path.join(projectRoot, 'public', 'cv');
const metadataPath = path.join(cvDirectory, 'cv-metadata.json');

// CV files to watch
const cvFiles = [
  path.join(cvDirectory, 'CV_ES_EzequielGaribotto.pdf'),
  path.join(cvDirectory, 'CV_EN_EzequielGaribotto.pdf')
];

// Function to update metadata
function updateMetadata() {
  const now = new Date().toISOString();
  const version = new Date().toISOString().split('T')[0].replace(/-/g, '.');
  
  const metadata = {
    lastUpdated: {
      es: now,
      en: now
    },
    version: version,
    notes: {
      es: `Actualización automática - ${new Date().toLocaleDateString('es-ES')}`,
      en: `Automatic update - ${new Date().toLocaleDateString('en-US')}`
    }
  };

  // Ensure directory exists
  if (!fs.existsSync(cvDirectory)) {
    fs.mkdirSync(cvDirectory, { recursive: true });
  }

  try {
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`✅ CV metadata updated automatically at ${new Date().toLocaleTimeString()}`);
    console.log(`   Version: ${version}`);
  } catch (error) {
    console.error('❌ Error updating CV metadata:', error);
  }
}

// Function to get file stats and check if CV files exist
function checkCVFiles() {
  const stats = {};
  let allExist = true;

  for (const filePath of cvFiles) {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      stats[path.basename(filePath)] = {
        size: stat.size,
        modified: stat.mtime.toISOString()
      };
    } else {
      allExist = false;
      console.warn(`⚠️  CV file not found: ${path.basename(filePath)}`);
    }
  }

  return { stats, allExist };
}

// Initialize metadata if CV files exist
function initializeMetadata() {
  const { allExist } = checkCVFiles();
  
  if (allExist) {
    // Only update if metadata doesn't exist or is outdated
    if (!fs.existsSync(metadataPath)) {
      console.log('📋 Initializing CV metadata...');
      updateMetadata();
    } else {
      console.log('📋 CV metadata file already exists');
    }
  }
}

// Start watching CV files
function startWatching() {
  console.log('👀 Starting CV file watcher for development...');
  console.log('📁 Watching directory:', cvDirectory);
  
  // Initialize metadata
  initializeMetadata();
  
  // Watch for changes to CV files
  const watcher = watch(cvFiles, {
    ignored: /[\/\\]\./,
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100
    }
  });

  watcher
    .on('change', (filePath) => {
      console.log(`📄 CV file changed: ${path.basename(filePath)}`);
      updateMetadata();
    })
    .on('add', (filePath) => {
      console.log(`📄 CV file added: ${path.basename(filePath)}`);
      updateMetadata();
    })
    .on('error', (error) => {
      console.error('❌ Watcher error:', error);
    });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping CV watcher...');
    watcher.close();
    process.exit(0);
  });

  console.log('✅ CV watcher started successfully!');
  console.log('💡 The metadata will update automatically when you modify CV files');
  console.log('🔄 Press Ctrl+C to stop watching');
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startWatching();
}

export { updateMetadata, checkCVFiles };
