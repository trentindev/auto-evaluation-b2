# Auto-évaluation B2 Fullstack 2025-2026

Formulaire d'auto-évaluation des compétences — Bachelor Fullstack B2 — RNCP 39608.

## Pour les apprenants

Accéder au formulaire via l'URL fournie par le class-manager.
Une fois le formulaire complété, cliquer sur "Télécharger mes résultats (CSV)"
et envoyer le fichier par email au class-manager.

---

## Pour le class-manager — Déploiement sur GitHub Pages

### Étape 1 — Créer un compte GitHub

Se rendre sur https://github.com et créer un compte si ce n'est pas déjà fait.

### Étape 2 — Créer un nouveau dépôt

- Cliquer sur le bouton "+" en haut à droite puis "New repository"
- Nommer le dépôt : `auto-evaluation-b2`
- Laisser le dépôt en "Public"
- Ne pas cocher "Add a README file"
- Cliquer sur "Create repository"

### Étape 3 — Installer les outils nécessaires

Installer Node.js depuis https://nodejs.org (version LTS recommandée).
Vérifier l'installation en ouvrant un terminal et en tapant :

```
node --version
npm --version
```

Installer Git depuis https://git-scm.com si ce n'est pas déjà fait.

### Étape 4 — Configurer le projet

Ouvrir un terminal dans le dossier du projet et exécuter :

```
npm install
```

Ouvrir le fichier `package.json` et modifier la ligne `"homepage"` :

```json
"homepage": "https://VOTRE_NOM_UTILISATEUR.github.io/auto-evaluation-b2"
```

Remplacer `VOTRE_NOM_UTILISATEUR` par le nom d'utilisateur GitHub exact.

### Étape 5 — Initialiser le dépôt Git local

Dans le terminal, exécuter les commandes suivantes une par une :

```
git init
git add .
git commit -m "Initial commit - auto-évaluation B2"
git branch -M main
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/auto-evaluation-b2.git
git push -u origin main
```

### Étape 6 — Déployer sur GitHub Pages

```
npm run deploy
```

Cette commande construit l'application et la publie automatiquement
sur la branche `gh-pages` du dépôt.

### Étape 7 — Activer GitHub Pages

- Aller dans le dépôt sur GitHub
- Cliquer sur "Settings" (engrenage)
- Dans le menu gauche, cliquer sur "Pages"
- Dans "Branch", sélectionner `gh-pages` puis `/ (root)`
- Cliquer sur "Save"

L'URL du formulaire sera disponible en quelques minutes à l'adresse :
`https://VOTRE_NOM_UTILISATEUR.github.io/auto-evaluation-b2`

### Mettre à jour le formulaire

Si des modifications sont apportées au formulaire, exécuter :

```
npm run deploy
```

La mise à jour est publiée automatiquement.
