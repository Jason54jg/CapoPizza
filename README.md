# Capo Pizza — Site web (Neufchâteau)

Site vitrine Next.js pour **Capo Pizza** : menu interactif, commande par téléphone, SEO local.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement GitHub Pages

Le site est publié en **export statique** sur :

**https://jason54jg.github.io/CapoPizza/**

### Première mise en place (une fois)

1. Sur GitHub : repo **CapoPizza** → **Settings** → **Pages**
2. **Build and deployment** → Source : **GitHub Actions** (pas « Deploy from a branch »)
3. Pousser sur `main` ou lancer le workflow **Deploy GitHub Pages** manuellement (**Actions** → **Run workflow**)

À chaque push sur `main`, le workflow build et déploie automatiquement.

### Tester le build Pages en local

```bash
npm run build:pages
```

Les fichiers statiques sont dans le dossier `out/` (avec le préfixe `/CapoPizza`).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build statique (racine `/`, pour dev) |
| `npm run build:pages` | Build identique à la CI GitHub Pages |
| `npm run lint` | ESLint |
