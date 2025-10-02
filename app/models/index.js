import { User } from "./user.model.js";
import { Game } from "./game.model.js";
import { Challenge } from "./challenge.model.js";
import { VideoSubmit } from "./video_submit.model.js";
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

// Relation Many-to-Many entre VideoSubmit et User via la table de jointure "vote_video".
// -> Un utilisateur peut voter pour plusieurs vidéos.
// -> Une vidéo peut recevoir des votes de plusieurs utilisateurs.
// "foreignKey: video_id" : clé qui relie une vidéo à la table de jointure.
// "otherKey: user_id" : clé qui relie un utilisateur à la table de jointure.
// "as: video_voters" : permet d’accéder à la liste des utilisateurs ayant voté pour une vidéo.
VideoSubmit.belongsToMany(User, {
    through: "vote_video",
    foreignKey: "video_id",
    otherKey: "user_id",
    as: "video_voters"
});

// Relation Many-to-Many entre User et VideoSubmit via la table de jointure "vote_video".
// -> Permet de savoir pour quelles vidéos un utilisateur a voté.
// "foreignKey: user_id" : clé qui relie un utilisateur à la table de jointure.
// "otherKey: video_id" : clé qui relie une vidéo à la table de jointure.
// "as: voted_videos" : permet d’accéder à la liste des vidéos votées par un utilisateur.
User.belongsToMany(VideoSubmit, {
    through: "vote_video",
    foreignKey: "user_id",
    otherKey: "video_id",
    as: "voted_videos"
});

// Déclare qu'un défi (Challenge) peut avoir plusieurs vidéos (VideoSubmit).
Challenge.hasMany(VideoSubmit, {
    foreignKey: "challenge_id",
    as: "videos"
});

// Déclare qu'une vidéo (VideoSubmit) appartient à un défi (Challenge).
VideoSubmit.belongsTo(Challenge, {
    foreignKey: "challenge_id",
    as: "challenge"
});

// Déclare qu'un utilisateur (User) peut avoir plusieurs vidéos (VideoSubmit).
User.hasMany(VideoSubmit, {
    foreignKey: "user_id",
    as: "videos"
});

// Déclare qu'une vidéo (VideoSubmit) appartient à un utilisateur (User).
VideoSubmit.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
}); 


export {
    User,
    Game,
    Challenge,
    VideoSubmit,
    sequelize
};

