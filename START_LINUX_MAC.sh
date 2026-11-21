#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo 'Нужен Node.js 20+ https://nodejs.org/'
  exit 1
fi
echo 'BRAWL//NEXUS: http://localhost:8787'
exec node server.js
