/**
 * Préfixe GitHub Pages (/CapoPizza). next/image (unoptimized) et les icônes
 * de metadata ne l’ajoutent pas d’eux-mêmes aux chemins de public/.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Export statique (GitHub Pages) : pas de Route Handlers, donc pas d’/api. */
export const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
