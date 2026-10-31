import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const theme = process.argv[2];
if (theme && !["none", "halloween", "christmas"].includes(theme)) {
  console.error("Thème invalide : none, halloween ou christmas attendu.");
  process.exit(1);
}
const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  // L’export statique prime même si le shell est configuré pour Docker.
  DOCKER: "false",
  ...(theme ? { NEXT_PUBLIC_SEASONAL_THEME: theme } : {}),
};

function run(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Un snapshot existant permet une compilation déterministe et sans scrape.
if (process.env.SKIP_REVIEWS_REFRESH !== "1") {
  run(fileURLToPath(new URL("fetch-google-reviews.mjs", import.meta.url)));
}
run(require.resolve("next/dist/bin/next"), ["build"]);
