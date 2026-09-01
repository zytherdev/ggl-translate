export interface GoogleTranslateConfig {
  pageLanguage: string;
  includedLanguages?: string;
  layout?: number;
  autoDisplay?: boolean;
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  customColors?: {
    background?: string;
    text?: string;
    hover?: string;
    border?: string;
  };
}

export interface LanguageSelectorProps {
  defaultLanguage?: string;
  supportedLanguages?: string;
  theme?: ThemeConfig;
  className?: string;
  style?: React.CSSProperties;
  onLanguageChange?: (language: string) => void;
  enableAutoDetection?: boolean;
  showNativeNames?: boolean;
  placeholder?: string;
  debug?: boolean;
}