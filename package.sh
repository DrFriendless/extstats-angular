#!/usr/bin/env bash

npm run build --prod extstats-angular && cd dist/extstats-angular && npm pack
