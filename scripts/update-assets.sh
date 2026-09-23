#!/usr/bin/env bash
# Build the README swatch images and publish them on the assets branch, which the README loads them from.
# main keeps only the palette; the images, the cover source, and the archived preview live on assets.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
npm run build

git fetch origin assets
worktree="$(mktemp -d)"
trap 'git worktree remove --force "$worktree"' EXIT
git worktree add --detach "$worktree" origin/assets

node --experimental-strip-types --input-type=module -e '
  import { swatchFiles } from "./scripts/write-swatches.ts";
  for (const path of Object.keys(swatchFiles())) console.log(path);
' | while read -r path; do
  mkdir -p "$worktree/$(dirname "$path")"
  cp "$path" "$worktree/$path"
done

cd "$worktree"
git add docs
if git diff --cached --quiet; then
  echo "assets branch is already up to date"
  exit 0
fi
git commit -m "Update README swatch images from the palette"
git push origin HEAD:assets
