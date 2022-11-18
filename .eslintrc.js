module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true
  },
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    uni: true, 
    wx: true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
      },
      typescript: {
        // always try to resolve types under `<root>@types`
        // directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,

        // Choose from one of the "project" configs
        // below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: '@'
      }
    }
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-promise-reject-errors': 'off',
    'linebreak-style': 'off', // 回车换行风格
    'no-trailing-spaces': 1, // 禁用行尾空格
    'no-param-reassign': 'off', // 禁止对函数参数再赋值
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off', // 不强制花括号内换行
    'arrow-body-style': 'off', // 箭头函数不强制以用块体（用花括号表示）
    'import/named': 'off', // 停用 import/named 校验
    'no-unused-expressions': 'off', // 禁止使用未使用的表达式
    'max-len': ['error', { code: 120 }],
    'comma-dangle': ["error", "never"], // 禁止末尾使用的逗号
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    // 默认不能使用一元运算符++和--
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'import/no-cycle': 'off',
    'no-underscore-dangle': 'off',
    'import/order': 'off',
    'prefer-object-spread': 'off',
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
    'no-async-promise-executor': 'off',
    'vue/no-multi-spaces': 'error', // 不允许有多余的空格
    'vue/html-end-tags': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        // 多行 html 结束符需要换行
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true
        }
      }
    ]
  },
  
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
