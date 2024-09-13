# Table des matières

1. [Introduction](#introduction)
2. [Pourquoi la collaboration en temps réel ?](#pourquoi-la-collaboration-en-temps-réel-)
3. [Défis du développement de fonctionnalités en temps réel](#défis-du-développement-de-fonctionnalités-en-temps-réel)
4. [Technologies utilisées](#technologies-utilisées)
   - [Next.js](#nextjs)
   - [React](#react)
   - [Liveblocks](#liveblocks)
   - [TailwindCSS](#tailwindcss)
   - [Clerk](#clerk)
   - [Radix UI](#radix-ui)
5. [Installation et utilisation](#installation-et-utilisation)
6. [Scripts disponibles](#scripts-disponibles)
7. [Contribuer](#contribuer)
8. [Licence](#licence)

# Projet de Collaboration en Temps Réel

De nombreuses entreprises SaaS rencontrent des difficultés à faire croître leur base d'utilisateurs et à maintenir l'engagement. Cela est principalement dû au fait que leurs produits ne sont pas conçus pour la façon dont les gens travaillent aujourd'hui. Les équipes recherchent des solutions collaboratives dans leur quotidien, mais se retrouvent à envoyer des fichiers par email, à partager des liens via Slack, et à jongler avec de multiples outils. Le travail devient alors fragmenté, déconnecté, et ralentit la productivité.

## Pourquoi la collaboration en temps réel est-elle essentielle ?

Les entreprises à forte croissance comme Figma, Linear et Notion prospèrent grâce à leur capacité à offrir une collaboration fluide avec des fonctionnalités telles que :

- Les commentaires en temps réel,
- Les notifications intelligentes,
- L'édition collaborative multijoueur.

Ces fonctionnalités permettent aux utilisateurs de travailler ensemble sans interruption, ce qui améliore à la fois la productivité et l'expérience utilisateur. Cela se traduit par une meilleure rétention des utilisateurs et une croissance durable.

## Défi du développement de la collaboration en temps réel

Créer des expériences de collaboration en temps réel peut sembler une tâche complexe. Des fonctionnalités simples, comme les commentaires ou les notifications, peuvent nécessiter des mois de développement pour assurer leur efficacité et leur qualité. De plus, la mise à l'échelle de l'infrastructure pour prendre en charge la collaboration multijoueur en temps réel est un défi technique majeur.

## Solution apportée par ce projet

Ce projet simplifie le développement d'une plateforme de collaboration en temps réel. Grâce à des outils et technologies modernes, nous offrons des fonctionnalités de collaboration avancées tout en minimisant les efforts de mise en place et de maintenance.

## Technologies Utilisées

Voici un aperçu des principales technologies utilisées dans ce projet :

### 1. **[Next.js](https://nextjs.org/)** (version 14.2.5)

Next.js est un framework React utilisé pour construire des applications web optimisées avec rendu côté serveur (SSR) et génération statique. Ce projet utilise Next.js pour gérer la structure et les performances de l'application.

### 2. **[React](https://reactjs.org/)** (version 18)

React est une bibliothèque JavaScript pour construire des interfaces utilisateur. Il permet de gérer les composants de manière efficace et de faciliter la création d'une interface interactive et réactive.

### 3. **[Liveblocks](https://liveblocks.io/)**

Liveblocks permet d'intégrer des fonctionnalités collaboratives en temps réel telles que l'édition multijoueur et les notifications en temps réel. Il est utilisé à travers plusieurs packages, notamment :

- `@liveblocks/client` pour gérer les connexions temps réel,
- `@liveblocks/react` pour les composants collaboratifs dans React,
- `@liveblocks/react-lexical` pour l'édition de texte en temps réel.

### 4. **[Clerk](https://clerk.dev/)**

Clerk est une solution d'authentification qui permet de gérer les utilisateurs et les permissions. Il est utilisé dans ce projet avec :

- `@clerk/nextjs` pour l'intégration Next.js,
- `@clerk/themes` pour le thème visuel.

### 5. **[Tailwind CSS](https://tailwindcss.com/)** (version 3.4.1)

Tailwind CSS est un framework de styles utilitaires permettant de créer rapidement des interfaces utilisateur personnalisées sans écrire beaucoup de CSS. `tailwindcss-animate` est utilisé pour les animations.

### 6. **[Radix UI](https://www.radix-ui.com/)**

Radix UI est une bibliothèque de composants React non-stylisés, utilisés pour créer des interfaces utilisateur accessibles et robustes. Des composants comme les boîtes de dialogue, les étiquettes, et les popovers sont utilisés à travers `@radix-ui/react-dialog`, `@radix-ui/react-label`, et `@radix-ui/react-popover`.

### 7. **Outils supplémentaires**

- **[Lexical](https://lexical.dev/)** : Un éditeur de texte pour les applications modernes, utilisé avec `@lexical/react`.
- **[nanoid](https://github.com/ai/nanoid)** : Un générateur d'ID unique pour les clés et identifiants des utilisateurs.
- **[Lucide-react](https://lucide.dev/)** : Une collection d'icônes React moderne.
- **`class-variance-authority` et `clsx`** : Utilisés pour gérer dynamiquement les classes CSS.

## Scripts

Voici quelques scripts utiles pour le développement et la gestion du projet :

- `dev` : Démarre le serveur de développement.
- `build` : Génère le build de production.
- `start` : Démarre l'application en mode production.
- `lint` : Vérifie la qualité du code avec ESLint.

## Comment démarrer le projet ?

1. **Installation des dépendances** :
   ```bash
   npm install
   ```
