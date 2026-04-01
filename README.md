# B&B Catherina — Landing page

Site vitrine (React + Vite) pour **Bed and Breakfast Catherina** à Ponsacco (Toscane). Frontend uniquement, données statiques.

## Prérequis

- Node.js 18+

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173`).

## Build production

```bash
npm run build
npm run preview
```

## Remplacer les images

Toutes les URLs d’images sont centralisées dans **`src/config/images.js`**.

1. Ouvrez `src/config/images.js`.
2. Remplacez chaque valeur `https://placehold.co/...` par :
   - une URL externe, ou
   - un chemin local vers `src/assets/images/` (ex. `new URL('./assets/images/hero.jpg', import.meta.url).href` n’est pas nécessaire si vous importez l’image ; le plus simple est de placer les fichiers dans `public/` et d’utiliser `/nom-fichier.jpg`, ou d’importer depuis `src/assets` dans `images.js` via `import hero from '../assets/images/hero.jpg'` puis exporter l’objet).

Pour des chemins **`public/`** : utilisez des chaînes du type `"/images/hero.jpg"` et placez les fichiers dans `public/images/`.

Après modification, mettez à jour aussi **`index.html`** (balises `og:image`, `apple-touch-icon`) et la config PWA dans **`vite.config.js`** si vous changez les icônes référencées par le manifeste.

## Contenu texte

Les textes sont dans **`src/data/content.js`** (y compris l’URL d’iframe Google Maps : `mapEmbedUrl`).

## PWA

Le plugin `vite-plugin-pwa` génère le service worker à la compilation. Les icônes du manifeste pointent vers les mêmes URLs que dans `src/config/images.js`.

## Livrable final (checklist)

- Pages : une route `/#/` (HashRouter) + redirection `*` vers l’accueil.
- Sections : Hero, About, Rooms, Amenities, Gallery, Location, Testimonials, Booking + Navbar / Footer.
- Thème clair/sombre persisté, bokeh en mode sombre, écran de chargement (session).
- Images : uniquement `src/config/images.js` ; textes : `src/data/content.js`.
- Build : `npm run build` (PWA + assets dans `dist/`).

## Scripts

| Commande        | Action                          |
|----------------|---------------------------------|
| `npm run dev`  | Serveur de développement        |
| `npm run build`| Build production + PWA          |
| `npm run preview` | Prévisualiser le build      |
| `npm run lint` | ESLint                          |

---

## Déploiement sur Netlify

Le dépôt inclut **`netlify.toml`** (commande de build, dossier de publication, Node 20, redirection SPA, cache des assets).

### Prérequis

- Compte [Netlify](https://www.netlify.com/) (gratuit possible).
- Ce dépôt sur **GitHub**, **GitLab** ou **Bitbucket** (recommandé), ou build manuel.

### Méthode 1 : Git (recommandé)

1. Poussez le code sur votre forge (ex. GitHub).
2. Sur Netlify : **Add new site** → **Import an existing project**.
3. Choisissez le fournisseur Git et le dépôt **Bed-And-Breakfast-Catherina** (ou le nom de votre repo).
4. Netlify détecte souvent Vite tout seul ; sinon configurez :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Laissez **`netlify.toml`** à la racine : il sera lu automatiquement (prioritaire sur l’UI).
6. Cliquez sur **Deploy site**.

Netlify exécute `npm install` puis `npm run build`. Le site est servi depuis **`dist/`**. HTTPS est activé par défaut (nécessaire pour la **PWA** / service worker).

### Méthode 2 : CLI Netlify (optionnel)

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Suivez les questions ; le fichier `netlify.toml` sera utilisé.

### Méthode 3 : Déploiement manuel du dossier `dist`

```bash
npm install
npm run build
```

Puis sur Netlify : **Sites** → **Add new site** → **Deploy manually**, et glissez-déposez le dossier **`dist`** (à la racine du zip si besoin).

### Après le déploiement

- **URL** : Netlify fournit une URL `*.netlify.app` ; vous pouvez ajouter un **domaine personnalisé** dans **Domain settings**.
- **Branches** : par défaut le build suit la branche principale ; les **deploy previews** fonctionnent sur les PR si le dépôt est connecté.
- **Variables d’environnement** : ce projet n’en nécessite aucune pour le build statique.

### En cas d’échec du build

- Vérifiez les **logs de build** sur Netlify (onglet du déploiement).
- Assurez-vous que **Node 20** est bien pris en compte (`.nvmrc` + `NODE_VERSION` dans `netlify.toml`).
- En local : `npm run build` doit réussir avant de pousser.

