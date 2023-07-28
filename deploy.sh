#!/usr/bin/env sh

# 忽略错误
set -e
#jest --coverage
# 构建
# npm run build:types && rollup -c
# 发布
npm run release
# 复制版本日志到文档日志
# shellcheck disable=SC2046
cp -f CHANGELOG.md $(pwd)/docs/examples/version/
# 复制文档
# shellcheck disable=SC2046
cp -f README.md $(pwd)/docs/examples/utils/co-utils工具库.md
git add .
git commit -m "build: build"
# 推送分支及发布仓库
git push origin master&&npm publish
#git push origin master&&git push origin --tags&&npm publish
#cat ./coverage/lcov.info | coveralls