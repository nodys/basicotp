#!/usr/bin/env bash

VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
find ./releases -type d -depth 1 | while read folder; do tar -C "./releases" -zcvf "./releases/$(basename $folder)-$VERSION.tgz" "$(basename $folder)"; rm -Rf "$folder"; done
