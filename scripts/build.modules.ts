import glob from 'fast-glob';
import { build } from 'tsup';
import { enterPath, outputEsmPath, outputLibPath, outputTypesPath } from './paths';
const fileEnterPaths = await glob(`**/*.ts`, {
  cwd: enterPath,
  absolute: true
});
await build({
  entry: fileEnterPaths,
  sourcemap: false,
  keepNames: true,
  clean: true,
  format: ['esm'],
  splitting: false,
  target: 'esnext',
  minify: 'terser',
  outDir: outputEsmPath,
  treeshake: true,
  globalName: 'EqianUtilsVue',
  external: ['vue'],
  dts: true
});
await build({
  entry: fileEnterPaths,
  sourcemap: false,
  clean: true,
  format: ['cjs'],
  target: 'esnext',
  minify: 'terser',
  globalName: 'EqianUtilsVue',
  outDir: outputLibPath,
  treeshake: true,
  external: ['vue'],
  dts: true
});
await build({
  entry: fileEnterPaths,
  clean: true,
  format: ['esm'],
  outDir: outputTypesPath,
  dts: {
    only: true
  }
});
