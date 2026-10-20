/**
 * Thème saisonnier — modifiez AVANT déploiement (ou via variable CI).
 *
 * Valeurs : "none" | "halloween" | "christmas"
 * - none      → thèmes clair / sombre uniquement (comportement par défaut)
 * - halloween → palette orange / violet + ambiance Halloween
 * - christmas → palette rouge / vert sapin + ambiance Noël
 *
 * Priorité au build : NEXT_PUBLIC_SEASONAL_THEME (GitHub Actions / .env)
 */
export const SITE_THEME_CONFIG = {
  seasonal: "none",
} as const satisfies {
  seasonal: "none" | "halloween" | "christmas";
};
