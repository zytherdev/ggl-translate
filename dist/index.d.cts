import React$1 from 'react';

interface GoogleTranslateConfig {
    pageLanguage: string;
    includedLanguages?: string;
    layout?: number;
    autoDisplay?: boolean;
}
interface ThemeConfig {
    mode: 'light' | 'dark' | 'system';
    customColors?: {
        background?: string;
        text?: string;
        hover?: string;
        border?: string;
    };
}
interface LanguageSelectorProps {
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

declare global {
    interface Window {
        google?: {
            translate?: {
                TranslateElement: {
                    new (options: any, element: string): any;
                    InlineLayout: {
                        SIMPLE: number;
                    };
                };
            };
        };
        googleTranslateElementInit?: () => void;
        __googleTranslateLoading?: boolean;
    }
}
declare const GoogleTranslate: React$1.FC<LanguageSelectorProps>;

declare const _getLanguageFlag: (code: string) => string;
declare const getLanguageName: (code: string) => string;
declare const getNativeLanguageName: (code: string) => string;
declare const detectUserLanguage: () => string;

declare const LANGUAGES: Record<string, {
    name: string;
    nativeName: string;
}>;

declare const LANGUAGE_FLAGS: Record<string, string>;

export { GoogleTranslate, type GoogleTranslateConfig, LANGUAGES, LANGUAGE_FLAGS, type LanguageSelectorProps, type ThemeConfig, _getLanguageFlag, GoogleTranslate as default, detectUserLanguage, getLanguageName, getNativeLanguageName };
