'use client';

//import { GoogleTranslate } from './lib';
import { GoogleTranslate } from '@zyther/ggl-translate'
import "@zyther/ggl-translate/dist/styles.css"
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 translate="no" className="text-3xl font-bold mb-8">
          🌐 Google Translate - Next.js
        </h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <GoogleTranslate
            defaultLanguage="en"
            supportedLanguages="pt,en,es,fr,it,ru,de,ja"
            theme={{ mode: 'system' }}
            enableAutoDetection={true}
            showNativeNames={true}
            debug={true}
            onLanguageChange={(lang) => {
              console.log('Idioma mudou para:', lang);
            }}
          />
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Example Text</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            This text will be automatically translated when you select a language.
          </p>
        </div>
      </div>
    </main>
  );
}