set -e
cd "$(dirname "$0")"
ORDINARY="${ORDINARY:?set ORDINARY to the ordinary-palette checkout}"
ORDINARY="$ORDINARY" python3 - <<'PY'
import os
s=open("src/styles.css").read().replace("/*PALETTE*/",open(os.environ["ORDINARY"]+"/src/colors.css").read())
open("src/styles.gen.css","w").write(s)
PY
npx esbuild src/scenes.tsx --bundle --outfile=out/app.js --jsx=automatic --alias:cn=./src/cn.ts --alias:palette=$ORDINARY/src/palette.ts --loader:.tsx=tsx --log-level=warning
npx @tailwindcss/cli -i src/styles.gen.css -o out/app.css >/dev/null 2>&1
PW=$(npm root -g)/playwright node shoot.cjs "$PWD/../fonts/package/dist/web/static/woff2" 1 2 3 4 5 6
