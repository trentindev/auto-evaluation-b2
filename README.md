# Auto-évaluation B2 Fullstack

> Outil d'auto-évaluation pédagogique pour les étudiants en Bachelor Fullstack B2 — ESNL, École Supérieure du Numérique des Landes.

**[Accéder à l'application →](https://trentindev.github.io/auto-evaluation-b2)**

---

## But

En fin d'année, chaque étudiant B2 fait le point sur ses compétences. L'idée est simple : parcourir 125 items répartis sur 13 matières, se noter honnêtement de 1 à 5, et exporter le résultat en CSV pour le transmettre au class-manager.

Ce n'est pas une évaluation notée. C'est un outil de réflexion sur son propre parcours — pour identifier ce qu'on maîtrise, ce qu'on a pratiqué en entreprise, et ce qu'il reste à consolider.

---

## Fonctionnement

L'application guide l'étudiant matière par matière. Pour chaque compétence, il choisit un niveau sur une échelle de 1 à 5 :

| Niveau | Signification                                       |
| ------ | --------------------------------------------------- |
| **1**  | Non acquis — je ne sais pas encore le faire         |
| **2**  | Vu en cours — je l'ai fait avec de l'aide           |
| **3**  | Pratiqué seul — mais pas encore fluide              |
| **4**  | Fluide seul — dans un contexte que je connais       |
| **5**  | Fluide dans tout contexte — je pourrais l'enseigner |

Il peut aussi indiquer si la compétence a été pratiquée en entreprise, ajouter une observation par item, et laisser un commentaire général sur chaque matière.

---

## Les 13 matières couvertes

1. Applications web dynamiques et interactives
2. Développement d'interfaces front-end
3. Ergonomie, UI et accessibilité
4. Architectures sécurisées — Cloud et réseaux
5. Administration d'hébergement web
6. Administration Linux
7. Bases de données SQL et NoSQL
8. Conception d'API Web
9. Frameworks et bibliothèques front-end
10. Initiation à la sauvegarde et au versioning
11. Versioning avec Git — niveau avancé
12. Initiation à l'étude d'un projet numérique — MOA
13. Méthodes agiles

---

## Ce que l'application fait bien

**Progression sauvegardée automatiquement.** Chaque réponse est enregistrée dans le localStorage. L'étudiant peut fermer l'onglet, revenir le lendemain — ses réponses l'attendent. Un indicateur de progression s'affiche dès la page d'accueil.

**Navigation libre entre les matières.** Un menu latéral permet d'accéder à n'importe quelle matière à tout moment, avec le statut de complétion de chacune visible d'un coup d'œil.

**Filtre "items sans réponse".** Sur chaque matière, un bouton permet d'afficher uniquement les items non encore renseignés — utile pour finir rapidement sans tout rescroller.

**Bilan visuel clair.** En fin de parcours, un tableau de bord affiche le score moyen par matière avec une barre colorée et un seuil visuel à 3/5 (niveau "acquis"). Chaque matière est cliquable pour y retourner directement.

**Export CSV propre.** Un fichier nommé automatiquement `auto_evaluation_NomPrenom_B2_2025.csv` est généré en UTF-8 avec BOM, prêt à être ouvert dans Excel ou transmis par email. Il inclut les commentaires par matière.

**Raccourcis clavier.** Sur desktop, les touches 1 à 5 notent directement le premier item sans réponse de la matière courante.

**Compatible smartphone.** Design mobile-first, thème sombre, police DM Sans — confortable pour une session de 20 à 30 minutes sur n'importe quel appareil.

---

## Stack technique

- **React** (Create React App)
- **CSS custom** — thème sombre, mobile-first, sans librairie externe
- **localStorage** — persistance côté client, aucune donnée envoyée sur un serveur
- **GitHub Pages** — hébergement statique

---

## Lancer le projet en local

```bash
git clone https://github.com/trentindev/auto-evaluation-b2.git
cd auto-evaluation-b2
npm install
npm start
```

## Déployer sur GitHub Pages

```bash
npm run deploy
```

---

## Structure du projet

```
auto-evaluation-b2/
├── public/
│   └── index.html
├── src/
│   ├── index.js        # Point d'entrée React
│   ├── index.css       # Styles globaux, thème sombre
│   ├── App.js          # Logique complète de l'application
│   └── data.js         # Matières et items — seul fichier à modifier pour le contenu
├── package.json
└── README.md
```

Pour modifier le contenu du formulaire (ajouter une matière, changer un item), **seul `data.js` est à éditer**.

---

## Contexte pédagogique

Cet outil est strictement pédagogique. Il n'a aucune incidence sur les notes ni sur la validation de l'année. Les réponses sont confidentielles et ne sont accessibles qu'au class-manager de la promotion. L'honnêteté est la seule chose qui rende l'exercice utile.

---

_Développé pour l'ESNL — École Supérieure du Numérique des Landes · Bachelor Fullstack B2 · 2025-2026_
