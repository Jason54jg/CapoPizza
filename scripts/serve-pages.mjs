/**
 * Sert l’export GitHub Pages comme en prod : assets sous /CapoPizza/.
 * Place aussi favicon / apple-touch-icon à la racine du serveur pour
 * éviter les 404 des sondes automatiques du navigateur (hors basePath).
 *
 * Usage : npm run build:pages && npm run serve:pages
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const outDir = join(root, "out");
const serveRoot = join(root, ".serve-pages");
const nested = join(serveRoot, "CapoPizza");

if (!existsSync(outDir)) {
  console.error("Dossier out/ introuvable. Lancez d’abord : npm run build:pages");
  process.exit(1);
}

rmSync(serveRoot, { recursive: true, force: true });
mkdirSync(nested, { recursive: true });
cpSync(outDir, nested, { recursive: true });

const favicon = join(nested, "favicon.ico");
const logo192 = join(nested, "images", "capo-logo-192.png");
if (existsSync(favicon)) {
  cpSync(favicon, join(serveRoot, "favicon.ico"));
}
if (existsSync(logo192)) {
  cpSync(logo192, join(serveRoot, "apple-touch-icon.png"));
  cpSync(logo192, join(serveRoot, "apple-touch-icon-precomposed.png"));
}

const port = process.env.PORT || "3000";
console.log(`→ http://localhost:${port}/CapoPizza/`);
const child = spawn(
  "npx",
  ["--yes", "serve", serveRoot, "-l", port, "--no-clipboard"],
  { stdio: "inherit", shell: true, cwd: root },
);
child.on("exit", (code) => process.exit(code ?? 0));
