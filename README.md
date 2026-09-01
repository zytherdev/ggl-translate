# @zyther/ggl-translate

A lightweight and modern Google Translate language selector for React.

Built with **TypeScript**, designed to be simple to integrate, and with **zero runtime dependencies**. React and React DOM are provided as peer dependencies.

## ✨ Features

- 🌍 Google Translate integration
- 🎨 Modern, customizable language selector
- 🌓 Light, dark and system themes
- 🚀 Zero runtime dependencies
- ⚛️ React 18+ support
- 📘 Full TypeScript support
- 🔄 Automatic browser language detection
- 🌐 Supports multiple languages
- 📱 Responsive design
- 🧩 Easy to integrate into existing React applications
- 🎯 Custom language flags and native names
- 🔁 Language changes persist across page reloads

## 📦 Installation

```bash
npm install @zyther/ggl-translate
```

## 🚀 Quick Start

Import the component and its styles:

```tsx
import { GoogleTranslate } from '@zyther/ggl-translate';
import '@zyther/ggl-translate/styles.css';

function App() {
  return (
    <GoogleTranslate
      defaultLanguage="en"
      supportedLanguages="en,pt,es,fr,de,it,ja,ko,zh"
    />
  );
}

export default App;
```

That's it.

The Google Translate engine is loaded automatically in the browser and the language selector is handled by the component.

## ⚙️ Configuration

```tsx
<GoogleTranslate
  defaultLanguage="en"
  supportedLanguages="en,pt,es,fr,de,it,ja,ko,zh"
  theme={{ mode: 'system' }}
  enableAutoDetection
  showNativeNames
  placeholder="Select Language"
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultLanguage` | `string` | `"en"` | Original language of your website |
| `supportedLanguages` | `string` | `"pt,en,es,fr,it,ru"` | Comma-separated list of available languages |
| `theme` | `{ mode: 'light' \| 'dark' \| 'system' }` | `{ mode: 'system' }` | Selector theme |
| `className` | `string` | `""` | Additional CSS class |
| `style` | `React.CSSProperties` | `{}` | Inline styles |
| `onLanguageChange` | `(language: string) => void` | — | Called when the selected language changes |
| `enableAutoDetection` | `boolean` | `true` | Detects the user's browser language |
| `showNativeNames` | `boolean` | `true` | Shows native language names |
| `placeholder` | `string` | `"Select Language"` | Selector placeholder |
| `debug` | `boolean` | `false` | Enables debug logging |

## 🌍 Supported Languages

The package includes a predefined list of commonly used languages:

```ts
import {
  LANGUAGES,
  LANGUAGE_FLAGS,
} from '@zyther/ggl-translate';
```

Available languages include:

| Code | Language | Native name |
|---|---|---|
| `en` | English | English |
| `pt` | Portuguese | Português |
| `es` | Spanish | Español |
| `fr` | French | Français |
| `de` | German | Deutsch |
| `it` | Italian | Italiano |
| `ru` | Russian | Русский |
| `ja` | Japanese | 日本語 |
| `ko` | Korean | 한국어 |
| `zh` | Chinese | 中文 |
| `ar` | Arabic | العربية |
| `nl` | Dutch | Nederlands |
| `pl` | Polish | Polski |
| `tr` | Turkish | Türkçe |
| `sv` | Swedish | Svenska |
| `da` | Danish | Dansk |
| `no` | Norwegian | Norsk |
| `fi` | Finnish | Suomi |
| `cs` | Czech | Čeština |
| `el` | Greek | Ελληνικά |
| `he` | Hebrew | עברית |
| `hi` | Hindi | हिन्दी |
| `hu` | Hungarian | Magyar |
| `id` | Indonesian | Bahasa Indonesia |
| `ms` | Malay | Bahasa Melayu |
| `ro` | Romanian | Română |
| `sk` | Slovak | Slovenčina |
| `uk` | Ukrainian | Українська |
| `vi` | Vietnamese | Tiếng Việt |
| `th` | Thai | ไทย |
| `ca` | Catalan | Català |
| `eu` | Basque | Euskara |
| `gl` | Galician | Galego |
| `hr` | Croatian | Hrvatski |
| `sr` | Serbian | Српски |
| `sl` | Slovenian | Slovenščina |
| `bg` | Bulgarian | Български |
| `et` | Estonian | Eesti |
| `lv` | Latvian | Latviešu |
| `lt` | Lithuanian | Lietuvių |
| `fa` | Persian | فارسی |
| `bn` | Bengali | বাংলা |
| `ta` | Tamil | தமிழ் |
| `te` | Telugu | తెలుగు |
| `ur` | Urdu | اردو |

You can pass any language code supported by Google Translate:

```tsx
<GoogleTranslate
  defaultLanguage="en"
  supportedLanguages="en,pt,es,fr,de,it,ja,ko,zh,ar,hi,uk"
/>
```

## 🎨 Themes

The component supports three theme modes:

```tsx
theme={{ mode: 'light' }}
```

```tsx
theme={{ mode: 'dark' }}
```

```tsx
theme={{ mode: 'system' }}
```

`system` automatically follows the user's operating-system/browser color scheme.

## 🔍 Automatic Language Detection

By default, the component attempts to detect the user's browser language.

```tsx
<GoogleTranslate
  defaultLanguage="en"
  supportedLanguages="en,pt,es,fr,de"
  enableAutoDetection
/>
```

If the detected language is not included in `supportedLanguages`, the component falls back to `defaultLanguage`.

To disable automatic detection:

```tsx
<GoogleTranslate
  defaultLanguage="en"
  enableAutoDetection={false}
/>
```

## 🎯 Listening for Language Changes

You can react to language changes with `onLanguageChange`:

```tsx
<GoogleTranslate
  defaultLanguage="en"
  supportedLanguages="en,pt,es,fr"
  onLanguageChange={(language) => {
    console.log('Language changed:', language);
  }}
/>
```

## 📱 Responsive

The selector is designed to work across:

- Desktop
- Tablet
- Mobile
- Touch devices

The component can also be customized with your own CSS:

```tsx
<GoogleTranslate
  className="my-language-selector"
/>
```

```css
.my-language-selector {
  max-width: 320px;
}
```

## 🧠 How It Works

`@zyther/ggl-translate` provides a custom React UI while using Google Translate as the translation engine.

The Google Translate widget itself is kept out of the visual interface, allowing the package to provide its own modern selector instead of relying on Google's default UI.

When the user selects a language, the selected translation is persisted and the page is reloaded so Google Translate can initialize with the requested language.

## ⚠️ Important Note

This package relies on Google's embedded Website Translator functionality.

Google's embedded translation widget is an older web integration and its behavior is controlled by Google. Changes to Google's services may affect the package without notice.

This library does not provide its own machine-translation engine.

## 🛠️ Development

Clone the repository:

```bash
git clone https://github.com/zytherdev/ggl-translate.git
cd ggl-translate
```

Install dependencies:

```bash
npm install
```

Run the development environment:

```bash
npm run dev
```

Build the package:

```bash
npm run build:lib
```

## 📚 TypeScript

The package includes TypeScript declarations automatically:

```ts
import {
  GoogleTranslate,
  LANGUAGES,
  LANGUAGE_FLAGS,
} from '@zyther/ggl-translate';
```

## 📄 License

MIT © **zytherdev**

## ⭐ Contributing

Issues, feature requests and pull requests are welcome.

If you find `@zyther/ggl-translate` useful, consider giving the project a ⭐.