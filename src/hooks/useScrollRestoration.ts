import { useEffect } from 'react';

export const useScrollRestoration = () => {
  useEffect(() => {
    const scrollRestore = () => {
      const scrollY = sessionStorage.getItem('scrollPosition');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        sessionStorage.removeItem('scrollPosition');
      }
    };

    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    
    if (document.readyState === 'complete') {
      scrollRestore();
    } else {
      window.addEventListener('load', scrollRestore);
    }

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('load', scrollRestore);
    };
  }, []);
};
