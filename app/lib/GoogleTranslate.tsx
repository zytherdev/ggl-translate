/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { LanguageSelectorProps } from './types';
import {
  getLanguageName,
  getNativeLanguageName,
  detectUserLanguage,
  getLanguageFlag,
} from './utils';

import './styles.css';

const GOOGLE_ELEMENT_ID = 'google_translate_element';
const GOOGLE_COOKIE = 'googtrans';

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

export const GoogleTranslate: React.FC<
  LanguageSelectorProps
> = ({
  defaultLanguage = 'en',
  supportedLanguages = 'pt,en,es,fr,it,ru',
  theme = { mode: 'system' },
  className = '',
  style = {},
  onLanguageChange,
  enableAutoDetection = true,
  showNativeNames = true,
  showStatus = true,
  placeholder = 'Select Language',
  debug = false,
}) => {
  const [currentLanguage, setCurrentLanguage] =
    useState(defaultLanguage);

  const [isInitialized, setIsInitialized] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const languages = useMemo(() => {
    return supportedLanguages
      .split(',')
      .map((code) =>
        code.trim().toLowerCase()
      )
      .filter(Boolean);
  }, [supportedLanguages]);

  const log = useCallback(
    (message: string, ...args: any[]) => {
      if (debug) {
        console.log(
          `[GoogleTranslate] ${message}`,
          ...args
        );
      }
    },
    [debug]
  );

  /**
   * read cookie googtrans.
   *
   * frmto:
   *
   * /en/pt
   * /en/es
   * /en/fr
   */
  const getGoogleLanguage = useCallback(() => {
    if (typeof document === 'undefined') {
      return null;
    }

    const cookie = document.cookie
      .split('; ')
      .find((row) =>
        row.startsWith(`${GOOGLE_COOKIE}=`)
      );

    if (!cookie) {
      return null;
    }

    const value = decodeURIComponent(
      cookie.split('=').slice(1).join('=')
    );

    const parts = value.split('/');

    if (parts.length >= 3) {
      const language =
        parts[2]?.toLowerCase();

      if (
        language &&
        languages.includes(language)
      ) {
        return language;
      }
    }

    return null;
  }, [languages]);

  /**
   * set cookie usado pelo Google Translate.
   *
   * ex:
   *
   * /en/pt
   */
  const setGoogleLanguage = useCallback(
    (language: string) => {
      if (typeof document === 'undefined') {
        return;
      }

      const value =
        `/${defaultLanguage}/${language}`;

      document.cookie =
        `${GOOGLE_COOKIE}=${value}; Domain=.zyther.dev; Path=/; Max-Age=31536000; SameSite=Lax`;

      log(
        '[GoogleTranslate] domain cookie:',
        value
      );
    },
    [defaultLanguage, log]
  );

  /**
   * rm completamente a tradução.
   *
   * whn o idioma slted é o idioma original
   * da página, não queremos:
   *
   * /en/en
   *
   * mas simplesmente rm o googtrans
   */
  const clearGoogleLanguage = useCallback(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const hostname = window.location.hostname;

    const isLocalhost =
      hostname === 'localhost' ||
      hostname === '127.0.0.1';

    // rm host-only cookie
    document.cookie =
      `${GOOGLE_COOKIE}=; Path=/; Max-Age=0`;

    // rm domain cookie usado pelo Google
    if (!isLocalhost) {
      document.cookie =
        `${GOOGLE_COOKIE}=; Domain=.zyther.dev; Path=/; Max-Age=0`;
    }

    log(
      '[GoogleTranslate] Cookies cleared'
    );
  }, [log]);

  /**
   * detect o idioma inicial
   */
  const getInitialLanguage = useCallback(() => {
    /**
     * 1. first, respect f/ uma tradução
     * já escolhida prv
     */
    const savedLanguage =
      getGoogleLanguage();

    if (savedLanguage) {
      return savedLanguage;
    }

    /**
     * 2. auto-detection yeahhhhh
     */
    if (enableAutoDetection) {
      const detected =
        detectUserLanguage()?.toLowerCase();

      if (
        detected &&
        languages.includes(detected)
      ) {
        return detected;
      }
    }

    /**
     * 3. faaaalback p/ idioma original da página
     */
    return defaultLanguage;
  }, [
    defaultLanguage,
    enableAutoDetection,
    getGoogleLanguage,
    languages,
  ]);

  /**
   * init o Google Translate
   */
  const initializeGoogleTranslate =
    useCallback(() => {
      if (typeof window === 'undefined') {
        return;
      }

      /**
       * if o ggl já loaded, init
       * right away
       */
      const initialize = () => {
        if (
          !window.google?.translate
            ?.TranslateElement
        ) {
          log(
            'Google Translate API not available'
          );

          setIsLoading(false);
          return;
        }

        const element =
          document.getElementById(
            GOOGLE_ELEMENT_ID
          );

        if (!element) {
          console.error(
            '[GoogleTranslate] Container not found'
          );

          setIsLoading(false);
          return;
        }

        /**
         * no criar múltiplas instances
         */
        if (
          element.querySelector(
            '.goog-te-gadget'
          )
        ) {
          log(
            'Google Translate already initialized'
          );

          setIsInitialized(true);
          setIsLoading(false);

          return;
        }

        try {
          new window.google.translate.TranslateElement(
            {
              /**
               * lang ORIGINAL do app
               */
              pageLanguage: defaultLanguage,

              /**
               * langs disponíveis
               */
              includedLanguages:
                supportedLanguages,

              layout:
                window.google.translate
                  .TranslateElement
                  .InlineLayout.SIMPLE,

              autoDisplay: false,
            },
            GOOGLE_ELEMENT_ID
          );

          setIsInitialized(true);
          setIsLoading(false);

          log(
            'Google Translate initialized'
          );
          
          const i = setInterval(() => {
            console.log('[GoogleTranslate] Checking body top style...');
            if(document.body.style.top !== '0px') {
              document.body.style.top = '0px';
              console.log('[GoogleTranslate] Reset body top to 0px');
            }
          }, 100)

          setTimeout(() => {
            clearInterval(i);
          }, 5000)
        } catch (error) {
          console.error(
            '[GoogleTranslate] Initialization error:',
            error
          );

          setIsLoading(false);
        }
      };

      /**
       * API já disponível
       */
      if (
        window.google?.translate
          ?.TranslateElement
      ) {
        initialize();
        return;
      }

      /**
       * script já está loading
       */
      if (
        window.__googleTranslateLoading
      ) {
        log(
          'Google Translate is already loading'
        );

        return;
      }

      window.__googleTranslateLoading =
        true;

      window.googleTranslateElementInit =
        () => {
          log(
            'Google Translate script loaded'
          );

          window.__googleTranslateLoading =
            false;

          initialize();
        };

      /**
       * no add script duplicado.
       */
      const existingScript =
        document.querySelector(
          'script[data-google-translate]'
        );

      if (existingScript) {
        log(
          'Google Translate script already exists'
        );

        return;
      }

      const script =
        document.createElement('script');

      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

      script.async = true;

      script.dataset.googleTranslate =
        'true';

      script.onerror = () => {
        console.error(
          '[GoogleTranslate] Failed to load Google Translate script'
        );

        window.__googleTranslateLoading =
          false;

        setIsLoading(false);
      };

      document.head.appendChild(script);
    }, [
      defaultLanguage,
      supportedLanguages,
      log,
    ]);

  /**
   * troca o idioma
   */
  const changeLanguage = useCallback(
    (language: string) => {
      if (
        !language ||
        !languages.includes(language)
      ) {
        return;
      }

      log(
        'Changing language:',
        language
      );

      /**
       * lang original:
       * rm tradução
       */
      if (
        language ===
        defaultLanguage.toLowerCase()
      ) {
        clearGoogleLanguage();
      } else {
        setGoogleLanguage(language);
      }

      setCurrentLanguage(language);

      onLanguageChange?.(language);

      /**
       * sweet delay p/ garantir que o
       * nav gravou o cookie bf reload
       */
      window.setTimeout(() => {
        window.location.reload();
      }, 50);
    },
    [
      languages,
      defaultLanguage,
      clearGoogleLanguage,
      setGoogleLanguage,
      onLanguageChange,
      log,
    ]
  );

  /**
   * init componente
   */
  useEffect(() => {
    /**
     * discover o idioma atual bf
     * init o ggl
     */
    const initialLanguage =
      getInitialLanguage();

    log(
      'Initial language:',
      initialLanguage
    );

    setCurrentLanguage(
      initialLanguage
    );

    /**
     * if !cookie && !idioma
     * detectado !== original
     * set it up bf load ggl
     */
    const savedLanguage =
      getGoogleLanguage();

    if (
      !savedLanguage &&
      initialLanguage !==
        defaultLanguage
    ) {
      setGoogleLanguage(
        initialLanguage
      );

      log(
        'Auto-detected language saved:',
        initialLanguage
      );
    }

    initializeGoogleTranslate();

    return () => {
      /**
       * no rm ggl script,
       * ele é global e pode estar sendo
       * elsewhere
       */
    };
  }, [
    getInitialLanguage,
    getGoogleLanguage,
    defaultLanguage,
    setGoogleLanguage,
    initializeGoogleTranslate,
    log,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const killHostOnly = () => {
      document.cookie =
        `${GOOGLE_COOKIE}=; Path=/; Max-Age=0`;
    };

    killHostOnly();

    const interval = window.setInterval(
      killHostOnly,
      100
    );

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 15000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  /**
   * langs names
   */
  const getLanguageDisplayName = (
    code: string
  ) => {
    const name =
      getLanguageName(code);

    const nativeName =
      getNativeLanguageName(code);

    if (
      showNativeNames &&
      nativeName
    ) {
      return `${nativeName} (${name})`;
    }

    return name;
  };

  return (
    <div
      className={`google-translate-container ${className}`}
      style={style}
      data-theme={theme.mode}
    >
      <div className="language-selector-wrapper">
        <span
          className="language-selector-icon"
          aria-hidden="true"
        >
          🌐
        </span>

        <select
          className="language-selector"
          value={currentLanguage}
          onChange={(event) =>
            changeLanguage(
              event.target.value
            )
          }
          disabled={isLoading}
          aria-label={placeholder}
        >
          {languages.map((code) => (
            <option
              key={code}
              value={code}
            >
              {getLanguageFlag(code)}{' '}
              {getLanguageDisplayName(
                code
              )}
            </option>
          ))}
        </select>

        <span
          className="language-selector-chevron"
          aria-hidden="true"
        >
          ⌄
        </span>
      </div>

      {/* ggl translate engine */}

      <div
        id={GOOGLE_ELEMENT_ID}
        className="google-translate-engine"
        aria-hidden="true"
      />

      {showStatus && isInitialized &&
        currentLanguage && (
          <div className="google-translate-status">
            <span className="status-indicator">
              ●
            </span>

            <span>
              {getLanguageDisplayName(
                currentLanguage
              )}
            </span>
          </div>
        )}
    </div>
  );
};

export default GoogleTranslate