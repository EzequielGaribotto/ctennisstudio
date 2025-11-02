import { Translations } from './baseTranslations';
import { en } from './en';
import { es } from './es';

/**
 * Combined translations object for all supported languages
 */
const translations: Record<string, Translations> = {
  en,
  es
};

export default translations;