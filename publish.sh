#!/usr/bin/env bash

rm -rf dist/*
npm run build extstats-angular --prod
cd dist/extstats-angular
npm publish
