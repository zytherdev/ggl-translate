import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  platform: 'browser',
  esbuildOptions(options) {
    options.jsx = 'automatic';
    return options;
  }
});