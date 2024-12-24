import { eslintPresets, fileNamingPlugin } from '@eqian/eslint-config-preset';
export default eslintPresets([
  {
    ignores: [
      'eslint.config.mjs',
      '**/*/*.d.ts',
      '__tests__/**/*.test.ts',
    ],
    name: 'test'
  },
  {
    name: 'file-naming',
    plugins: {
      'file-naming': fileNamingPlugin,
    },
    rules: {
      'file-naming/folder-naming': [
        'error',
        {
          'src/**/*': 'CAMEL_CASE', // 对文件夹统一使用小驼峰
        }
      ],
      'file-naming/filename-naming': [
        'error',
        {
          'src/**/*.{ts,js,mts,mjs}': 'CAMEL_CASE', // 对文件统一使用小驼峰
        }
      ],
    }
  }
]);
