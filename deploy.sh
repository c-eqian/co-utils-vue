#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
<<<<<<< HEAD
<<<<<<< HEAD
# npm run build:types && rollup -c
=======
npm run build:types && rollup -c
>>>>>>> 🐳 chore: 添加自动化构建
=======
# npm run build:types && rollup -c
>>>>>>> 🐳 chore: 修改构建流程

# 发布
npm run release
# 复制版本日志到文档日志
cp CHANGELOG.md /docs/example/version
# 复制文档
cp co-utils工具库.md /docs/example/utils

# 推送分支及发布仓库
git push origin master&&git push origin --tags&&npm publish
