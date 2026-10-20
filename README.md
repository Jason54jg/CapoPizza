# Capo Pizza — Site web (Neufchâteau)

Site vitrine Next.js pour **Capo Pizza** : menu interactif, commande par téléphone, SEO local.

## URL publique (GitHub Pages)

**https://jason54jg.github.io/CapoPizza/**

> Utilisez bien **`/CapoPizza/`** à la fin (nom du dépôt).  
> `https://jason54jg.github.io/` seul affichera une 404 — c’est normal.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## GitHub Pages — configuration (important)

Si vous voyez une **404**, c’est presque toujours l’un de ces points :

### 1. Activer Pages sur la bonne source

1. [Settings → Pages](https://github.com/Jason54jg/CapoPizza/settings/pages)
2. **Build and deployment** → **Source** : **Deploy from a branch**
3. **Branch** : `gh-pages` → dossier **`/ (root)`** → **Save**

*(Ne pas choisir la branche `main` : elle contient le code source, pas le site compilé.)*

### 2. Lancer le déploiement

- Chaque push sur `main` déclenche le workflow **Deploy GitHub Pages**
- Ou manuellement : **Actions** → **Deploy GitHub Pages** → **Run workflow**

Attendre 1 à 3 minutes, puis ouvrir l’URL ci-dessus.

### 3. Vérifier que le workflow a réussi

**Actions** → dernier run **Deploy GitHub Pages** doit être vert ✓  
La branche `gh-pages` doit contenir `index.html`.

## Tester le build Pages en local

```bash
npm run build:pages
npx serve out
```

Puis ouvrir l’URL indiquée avec le chemin `/CapoPizza/` si besoin.

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build statique (racine `/`) |
| `npm run build:pages` | Build identique à la CI (`/CapoPizza`) |
| `npm run lint` | ESLint |
