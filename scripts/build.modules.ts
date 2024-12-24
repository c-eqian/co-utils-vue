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
  target: 'node18.18',
  minify: true,
  outDir: outputEsmPath,
  globalName: 'EqianUtilsVue',
  external: ['vue'],
  dts: false
});
await build({
  entry: fileEnterPaths,
  sourcemap: false,
  clean: true,
  format: ['cjs'],
  target: 'node18.18',
  minify: true,
  globalName: 'EqianUtilsVue',
  outDir: outputLibPath,
  external: ['vue'],
  dts: false
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
