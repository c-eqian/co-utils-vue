import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// 获取当前文件的目录路径
const __dirname__ = fileURLToPath(new URL('.', import.meta.url));
// 项目根目录
export const projectRoot = resolve(__dirname__, '..');

export const enterPath = resolve(projectRoot, 'src');

export const outputPath = resolve(projectRoot, 'dist');
export const outputEsmPath = resolve(outputPath, 'es');
export const outputLibPath = resolve(outputPath, 'lib');
export const outputTypesPath = resolve(outputPath, 'types');
