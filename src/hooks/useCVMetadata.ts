import { useState, useEffect } from 'react';
import { CV_FILES } from '../constants';

export interface CVMetadata {
  lastUpdated: {
    es: string;
    en: string;
  };
  version: string;
  notes: {
    es: string;
    en: string;
  };
}

const FALLBACK_METADATA: CVMetadata = {
  lastUpdated: {
    es: "2024-12-15T10:30:00Z",
    en: "2024-12-15T10:30:00Z"
  },
  version: "2024.12.15",
  notes: {
    es: "Versión de respaldo",
    en: "Fallback version"
  }
};

export function useCVMetadata() {
  const [metadata, setMetadata] = useState<CVMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(CV_FILES.METADATA, {
          cache: 'no-cache'
        });
        
        if (response.ok) {
          const data: CVMetadata = await response.json();
          setMetadata(data);
        } else {
          console.warn('Failed to fetch CV metadata, using fallback');
          setMetadata(FALLBACK_METADATA);
        }
      } catch (error) {
        console.error('Error fetching CV metadata:', error);
        setMetadata(FALLBACK_METADATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return { metadata, isLoading };
}
