export const formatDate = (date: Date | string | null, locale: string, includeTime: boolean = false): string => {
  if (!date) return "Unknown";
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';
  
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
  };
  
  if (includeTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return dateObj.toLocaleDateString(localeString, dateOptions) + ' ' + 
           dateObj.toLocaleTimeString(localeString, timeOptions);
  }
  
  return dateObj.toLocaleDateString(localeString, dateOptions);
};
