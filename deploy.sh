#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
