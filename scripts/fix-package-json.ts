/**
 * Post-build fix for ng-packagr-generated package.json.
 * Replaces fragile `sed -i` hacks with a reliable Node.js transformation.
 *
 * Usage (run from projects/shared/):
 *   bun run ../../scripts/fix-package-json.ts
 *
 * Can optionally pass a custom dist directory:
 *   bun run ../../scripts/fix-package-json.ts /path/to/dist
 *
 * Fixes applied to generated package.json:
 * 1. Removes /"sideEffects": false,/ line (too broad; Angular libs have side effects)
 * 2. Strips erroneous ./dist/ prefix from entry paths (main, import, types)
 * 3. Sets sideEffects to a precise array so bundlers can tree-shake unused CSS
 */

import * as fs from "fs";
import * as path from "path";

// Script lives at <repo>/scripts/fix-package-json.ts.
// Dist is always at <repo>/projects/shared/dist when run from the shared project.
// Support an optional CLI argument to override for other projects.
const repoRoot = path.resolve(__dirname, "..");
const DIST_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(repoRoot, "projects/shared/dist");
const PKG_PATH = path.join(DIST_DIR, "package.json");

interface Pkg {
  main?: string;
  types?: string;
  sideEffects?: boolean | unknown[];
  exports?: Record<string, unknown>;
  [key: string]: unknown;
}

function fixSideEffects(pkg: Pkg): void {
  if (typeof pkg.sideEffects === "boolean" && pkg.sideEffects === false) {
    // Replace blanket false with a precise array so bundlers can tree-shake CSS
    pkg.sideEffects = ["./fesm2022/tauri-front-shared.mjs", "./**/*.css"];
  }
}

function stripDistPrefix(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/^"\.\/dist\//, '"./').replace(/^\.\/dist\//, "./");
}

function fixPaths(pkg: Pkg): void {
  if (typeof pkg.main === "string") {
    pkg.main = stripDistPrefix(pkg.main) ?? pkg.main;
  }
  if (typeof pkg.types === "string") {
    pkg.types = stripDistPrefix(pkg.types) ?? pkg.types;
  }
  if (pkg.exports && typeof pkg.exports === "object") {
    for (const [, val] of Object.entries(pkg.exports)) {
      if (val && typeof val === "object") {
        const entry = val as Record<string, unknown>;
        if (typeof entry.main === "string") {
          entry.main = stripDistPrefix(entry.main) ?? entry.main;
        }
        if (typeof entry.import === "string") {
          entry.import = stripDistPrefix(entry.import) ?? entry.import;
        }
        if (typeof entry.types === "string") {
          entry.types = stripDistPrefix(entry.types) ?? entry.types;
        }
      }
    }
  }
}

function main(): void {
  if (!fs.existsSync(PKG_PATH)) {
    console.error(`fix-package-json: ${PKG_PATH} not found — skip`);
    return;
  }

  const pkg: Pkg = JSON.parse(fs.readFileSync(PKG_PATH, "utf-8"));
  fixPaths(pkg);
  fixSideEffects(pkg);
  fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`fix-package-json: patched ${PKG_PATH}`);
}

main();
