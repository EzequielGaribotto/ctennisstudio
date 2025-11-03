export const getResponsiveIconSize = (): number => {
  if (typeof window === 'undefined') return 20;
  
  if (window.innerWidth <= 480) return 16;
  if (window.innerWidth <= 768) return 18;
  return 20;
};
