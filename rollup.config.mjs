import path from 'path'
import { fileURLToPath } from 'node:url'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupTypescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import  terser  from '@rollup/plugin-terser'

// 读取 package.json 配置
import pkg from './package.json' assert {type: 'json'}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(__dirname, 'src/index.ts')
// 当前运行环境，可通过 cross-env 命令行设置
// const env = process.env.NODE_ENV
// umd 模式的编译结果文件输出的全局变量名称
// const name = 'co-utils-vue'
const config = {
  // 入口文件，src/utils.ts
  input: dir,
  // 输出文件
  output: [
    // commonjs
    {
      // package.json 配置的 main 属性
      file: pkg.main,
      format: 'cjs',
      sourcemap: false,
      name: pkg.name
    },
    // es module
    {
      // package.json 配置的 module 属性
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      name: pkg.name
    },
    // umd
    {
      // umd 导出文件的全局变量
      name: pkg.name,
      sourcemap: true,
      // package.json 配置的 umd 属性
      file: pkg.umd,
      format: 'umd'
    }
  ],
  plugins: [
    // 识别 commonjs 模式第三方依赖
    commonjs(),
    // 解析第三方依赖
    resolve(),
    // rollup 编译 typescript
    rollupTypescript({
      tsconfig:'./tsconfig.json',
      sourceMap: true
    }),
    // babel 配置
    babel({
      // 编译库使用 runtime
      babelHelpers: 'runtime',
      // 只转换源代码，不转换外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    }),
  ]
}
// // 若打包正式环境，压缩代码
// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(terser({
//     compress: {
//       pure_getters: true,
//       unsafe: true,
//       unsafe_comps: true
//     }
//   }))
// }
export default config
