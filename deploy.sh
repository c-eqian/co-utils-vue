#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build:types && rollup -c

# 发布
npm run release
# 复制版本日志到文档日志
cp CHANGELOG.md /docs/example/version
# 复制文档
cp co-utils工具库.md /docs/example/utils

# 推送分支及发布仓库
git push origin master&&git push origin --tags&&npm publish
