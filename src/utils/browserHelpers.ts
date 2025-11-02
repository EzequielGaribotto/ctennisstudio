export const detectPdfSupport = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  if (isMobile) return false;
  
  const isChrome = userAgent.includes('chrome');
  const isFirefox = userAgent.includes('firefox');
  const isSafari = userAgent.includes('safari') && !isChrome;
  
  return isChrome || isFirefox || !isSafari;
};

export const getResponsiveIconSize = (): number => {
  if (typeof window === 'undefined') return 20;
  
  if (window.innerWidth <= 480) return 16;
  if (window.innerWidth <= 768) return 18;
  return 20;
};
