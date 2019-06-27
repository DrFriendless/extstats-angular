#!/usr/bin/env bash

ng build --prod extstats-angular && cd dist/extstats-angular && npm pack
