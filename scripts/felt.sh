#!/usr/bin/env sh

MAP_ID=$1

if [ -z $FELT_ACCESS_TOKEN ]; then
    echo "Missing access token. Set FELT_ACCESS_TOKEN and try again."
    exit 1
fi

URL="https://felt.com/api/v1/maps/${MAP_ID}/elements"

curl -H "authorization: Bearer ${FELT_ACCESS_TOKEN}" $URL | jq '.data'
