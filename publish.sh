#!/usr/bin/env bash

rm -rf dist/*
ng build extstats-angular --prod
cd dist/extstats-angular
npm publish
