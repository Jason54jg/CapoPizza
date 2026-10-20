/**
 * Thème saisonnier — modifiez AVANT déploiement (ou via variable CI).
 *
 * Valeurs : "none" | "halloween" | "christmas"
 * - none      → identité Capo (brique / four) clair & sombre — PAS Halloween
 * - halloween → aubergine + citrouille (distinct du thème de base)
 * - christmas → bordeaux + sapin / or
 *
 * Priorité au build : NEXT_PUBLIC_SEASONAL_THEME (GitHub Actions / .env)
 * Vérifier qu’aucune variable d’env ne force halloween en local.
 */
export const SITE_THEME_CONFIG = {
  seasonal: "halloween",
} as const satisfies {
  seasonal: "none" | "halloween" | "christmas";
};
