import glob from 'fast-glob';
import { build } from 'tsup';
import { enterPath, outputPath } from './paths';
const fileEnterPaths = await glob(`index.ts`, {
  cwd: enterPath,
  absolute: true
});
await build({
  entry: fileEnterPaths,
  sourcemap: false,
  keepNames: true,
  clean: true,
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    if (format === 'cjs') {
      return {
        js: `.cjs`
      };
    }
    return {
      js: `.mjs`
    };
  },
  splitting: false,
  target: 'esnext',
  minify: 'terser',
  outDir: outputPath,
  treeshake: true,
  globalName: 'EqianUtilsVue',
  external: ['vue'],
  dts: false
});
const dtsPaths = await glob(`index.ts`, {
  cwd: enterPath,
  absolute: true
});
await build({
  entry: dtsPaths,
  clean: true,
  format: ['esm'],
  outDir: outputPath,
  dts: {
    only: true
  }
});
