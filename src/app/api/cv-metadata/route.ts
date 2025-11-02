export const dynamic = 'force-static';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'cv', 'cv-metadata.json');
    
    if (fs.existsSync(metadataPath)) {
      const metadata = fs.readFileSync(metadataPath, 'utf8');
      const parsedMetadata = JSON.parse(metadata);
      
      return NextResponse.json(parsedMetadata, {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      });
    } else {
      // Fallback metadata if file doesn't exist
      const fallbackMetadata = {
        lastUpdated: {
          es: "2024-12-15T10:30:00Z",
          en: "2024-12-15T10:30:00Z"
        },
        version: "2024.12.15",
        notes: {
          es: "Versión inicial",
          en: "Initial version"
        }
      };
      
      return NextResponse.json(fallbackMetadata);
    }
  } catch (error) {
    console.error('Error reading CV metadata:', error);
    
    // Return fallback metadata on error
    const fallbackMetadata = {
      lastUpdated: {
        es: "2024-12-15T10:30:00Z",
        en: "2024-12-15T10:30:00Z"
      },
      version: "2024.12.15",
      notes: {
        es: "Error al cargar metadatos",
        en: "Error loading metadata"
      }
    };
    
    return NextResponse.json(fallbackMetadata);
  }
}
