import { User } from "./user.model.js";
import { Game } from "./game.model.js";
import { Challenge } from "./challenge.model.js";
import { Participation } from "./participation.model.js";

import { sequelize } from "./sequelize.client.js";

// Définition des relations entre les modèles

// Déclare qu'un utilisateur (User) peut avoir plusieurs défis (Challenge).
// La clé étrangère "user_id" sera utilisée pour lier les défis à l'utilisateur.
// L'alias "challenges" permet d'accéder facilement à la liste des défis d'un utilisateur.
User.hasMany(Challenge, {
    foreignKey: "user_id",
    as : "challenges"
});

// Déclare qu'un défi (Challenge) appartient à un utilisateur (User).
// Utilise également la clé étrangère "user_id" pour faire le lien.
// L'alias "user" permet d'accéder à l'utilisateur associé à un défi.
Challenge.belongsTo(User, {
    foreignKey: "user_id",
    as : "user"
});

// Déclare qu'un jeu (Game) peut avoir plusieurs défis (Challenge).
// La clé étrangère "game_id" sera utilisée pour lier les défis au jeu.
// L'alias "challenges" permet d'accéder facilement à la liste des défis d'un jeu.
Game.hasMany(Challenge, {
    foreignKey: "game_id",
    as: "challenges"
});

// Déclare qu'un défi (Challenge) appartient à un jeu (Game).
// Utilise également la clé étrangère "game_id" pour faire le lien.
// L'alias "game" permet d'accéder au jeu associé à un défi.
Challenge.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Déclare une relation Many-to-Many entre User et Challenge via la table de jointure "vote_challenge".
// Cela permet de savoir quels utilisateurs ont voté pour quels défis.
User.belongsToMany(Challenge, {
    through: "vote_challenge",
    foreignKey: "user_id",
    otherKey: "challenge_id",
    as: "voted_challenges"
});

// Déclare une relation Many-to-Many entre Participation et User via la table de jointure "vote_participation".
// Cela permet de savoir quels utilisateurs ont voté pour une participation donnée.
// La clé étrangère "participation_id" relie la participation à la table de jointure.
// L'alias "participation_voters" permet d'accéder à la liste des utilisateurs ayant voté pour une participation.
Participation.belongsToMany(User, {
    through: "vote_participation",
    foreignKey: "participation_id",
    otherKey: "user_id",
    as: "participation_voters"
});

// Déclare une relation Many-to-Many entre Challenge et User via la table de jointure "vote_challenge".
// Cela permet de savoir quels utilisateurs ont voté pour un défi donné.
// La clé étrangère "challenge_id" relie le défi à la table de jointure.
// L'alias "challenge_voters" permet d'accéder à la liste des utilisateurs ayant voté pour un défi.
Challenge.belongsToMany(User, {
    through: "vote_challenge",
    foreignKey: "challenge_id",
    otherKey: "user_id",
    as: "challenge_voters"
});

export {
    User,
    Game,
    Challenge,
    Participation,
    sequelize
};