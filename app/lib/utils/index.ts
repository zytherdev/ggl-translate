import { LANGUAGE_FLAGS } from './flags';
import { LANGUAGES } from './langs';

export const _getLanguageFlag = (
    code: string
  ) => {
    return LANGUAGE_FLAGS[code] ?? '';
  };

export const getLanguageName = (code: string): string => {
  return LANGUAGES[code]?.name || code;
};

export const getNativeLanguageName = (code: string): string => {
  return LANGUAGES[code]?.nativeName || code;
};

export const detectUserLanguage = (): string => {
  try {
    const language = navigator.language || navigator.languages?.[0] || 'en';
    const mainLanguage = language.split('-')[0].toLowerCase();
    return mainLanguage.length === 2 ? mainLanguage : 'en';
  } catch (error) {
    return 'en';
  }
}