# Prérequis, Installation et Setup du projet GamerChallenges

## Prérequis

- **Node.js** (version recommandée : 18.x ou supérieure)
- **npm** (généralement installé avec Node.js)
- **Git** (pour cloner le dépôt)
- **Base de données PostgreSQL** (ou adapter selon votre configuration)

## Installation

1. **Cloner le dépôt**

```bash
git clone <url-du-repo>
cd projet-gamerchallenges
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet et renseignez les variables nécessaires (exemple) :

```
DB_URL=postgres://user:password@localhost:5432/dbname
SESSION_SECRET=une_chaine_secrete
PORT=3000
```

4. **Initialiser la base de données**

- Exécutez les scripts de migration et de seed si besoin :

```bash
node data/01.create_tables.js
node data/02.seed_tables.js
```

5. **Lancer le serveur**

```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3000` (ou le port défini dans `.env`).

## Tests unitaires

Des tests unitaires sont présents pour garantir la fiabilité du code.

1. **Lancer les tests**

```bash
npm test
```

2. **Structure des tests**

Les fichiers de tests se trouvent généralement à côté des fichiers à tester avec l’extension `.test.js`.

3. **Conseils**

- Vérifiez que toutes les dépendances de test (`vitest`, `@testing-library/dom`,`jsdom`) sont bien installées.
- Pour exécuter un test spécifique, référez-vous à la documentation de l’outil de test utilisé.

## Structure du projet

- `app/` : Contrôleurs, modèles, routes, vues EJS
- `public/` : Fichiers statiques (CSS, JS, images)
- `data/` : Scripts de création et de seed de la base
- `index.js` : Point d'entrée de l'application

## Conseils supplémentaires

- Pour le développement, vous pouvez utiliser `npm run dev` si un script nodemon est configuré.
- Pensez à adapter la configuration de la base de données selon votre environnement.
- Les fichiers CSS sont dans `public/css/pages/`.
- Les vues sont dans `app/views/`.

## Dépendances utilisées

- **argon2** : Pour le hachage sécurisé des mots de passe utilisateurs.
- **dotenv** : Pour charger les variables d'environnement depuis un fichier `.env`.
- **ejs** : Moteur de templates pour générer les vues côté serveur.
- **emailjs** : Pour l'envoi d'e-mails (ex : formulaire de contact).
- **eslint** : Outil d'analyse statique pour garantir la qualité et la cohérence du code JavaScript.
- **express** : Framework web principal pour la gestion des routes, middlewares et serveur HTTP.
- **express-session** : Pour la gestion des sessions utilisateurs (authentification, etc.).
- **joi** : Pour la validation des schémas de données côté serveur (ex : validation des formulaires).
- **pg** : Client PostgreSQL pour Node.js, utilisé par Sequelize pour interagir avec la base de données.
- **sequelize** : ORM (Object-Relational Mapping) pour faciliter les requêtes SQL et la gestion des modèles.
- **xss** : Pour protéger l'application contre les attaques XSS (Cross-Site Scripting).

Chaque dépendance est essentielle pour la sécurité, la robustesse ou la facilité de développement du projet.

---

Pour toute question ou problème, consultez le README ou contactez l’équipe de développement.