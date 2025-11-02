'use client';

import { ReactNode } from 'react';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export default function ScrollRestorationWrapper({ children }: { children: ReactNode }) {
  useScrollRestoration();
  
  return <>{children}</>;
}
