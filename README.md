# Capo Pizza — Site web (Neufchâteau)

Site vitrine Next.js pour **Capo Pizza** : menu interactif, commande par téléphone, SEO local.

## URL publique (site **projet** GitHub Pages)

**https://jason54jg.github.io/CapoPizza/**

Ce n’est **pas** un site `username.github.io` (démarrage rapide Jekyll de la doc) : le dépôt s’appelle `CapoPizza`, donc l’URL inclut **`/CapoPizza/`**.

Référence : [Types de sites GitHub Pages](https://docs.github.com/fr/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites).

---

## Publication GitHub Pages (méthode officielle Next.js + Actions)

Suivre la doc **« Publier avec un flux de travail GitHub Actions personnalisé »**, pas seulement le [démarrage rapide](https://docs.github.com/fr/pages/quickstart) (qui décrit un repo `username.github.io` + branche + Jekyll).

### 1. Activer Pages (une fois)

1. Ouvrir [Settings → Pages](https://github.com/Jason54jg/CapoPizza/settings/pages)
2. **Génération et déploiement** → **Source** : **GitHub Actions**  
   (ne pas laisser « Déployer à partir d’une branche » sur `main` ou `gh-pages` — le site compilé est publié par le workflow, pas par le code source.)

Doc : [Configurer une source de publication](https://docs.github.com/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).

### 2. Déclencher le déploiement

- Push sur `main`, **ou**
- **Actions** → **Deploy Next.js site to Pages** → **Run workflow**

Le workflow (modèle GitHub pour Next.js) :

1. build → `npm ci` + `npm run build` → dossier `out/`
2. `actions/upload-pages-artifact` + `actions/deploy-pages`

### 3. Dépôt public (compte Free)

Sur le plan gratuit, **Pages publique** nécessite un dépôt **public** (ou un plan qui autorise Pages sur dépôt privé).  
[Settings → General → Change repository visibility](https://github.com/Jason54jg/CapoPizza/settings).

---

## Développement local

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

Simuler le build GitHub Pages :

```bash
npm run build:pages
npx serve out
```

---

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Développement (sans `/CapoPizza` dans l’URL) |
| `npm run build` | Build statique local |
| `npm run build:pages` | Même `basePath` que GitHub Pages |
| `npm run lint` | ESLint |
