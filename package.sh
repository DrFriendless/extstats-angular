#!/usr/bin/env bash

rm extstats-angular-*.tgz
npm run build --production
cd dist/extstats-angular
npm pack
cp extstats-angular-*.tgz ../..
cd ../..
cp extstats-angular-*.tgz ../repo
