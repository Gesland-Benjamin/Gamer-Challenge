// This file sets up and exports all models and their relationships using Sequelize ORM.
// It imports all model definitions and establishes associations (one-to-many, many-to-many, etc.) between them.
// This centralizes model imports and relationship logic for the application.

import { User } from "./user.model.js";
import { Game } from "./game.model.js";
import { Challenge } from "./challenge.model.js";
import { VideoSubmit } from "./video_submit.model.js";
import { ImageSubmit } from "./image_submit.model.js";
import { sequelize } from "./sequelize.client.js";

// Define relationships between models

// A User can have many Challenges (one-to-many)
// The foreign key 'user_id' links challenges to the user
// The alias 'challenges' allows easy access to a user's challenges
User.hasMany(Challenge, {
    foreignKey: "user_id",
    as : "challenges"
});

// A Challenge belongs to a User (many-to-one)
// Uses the foreign key 'user_id' to link
// The alias 'user' allows access to the user associated with a challenge
Challenge.belongsTo(User, {
    foreignKey: "user_id",
    as : "user"
});

// A Game can have many Challenges (one-to-many)
// The foreign key 'game_id' links challenges to the game
// The alias 'challenges' allows easy access to a game's challenges
Game.hasMany(Challenge, {
    foreignKey: "game_id",
    as: "challenges"
});

// A Challenge belongs to a Game (many-to-one)
// Uses the foreign key 'game_id' to link
// The alias 'game' allows access to the game associated with a challenge
Challenge.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Many-to-Many relationship between User and Challenge via 'vote_challenge' join table
// Allows tracking which users voted for which challenges
User.belongsToMany(Challenge, {
    through: "vote_challenge",
    foreignKey: "user_id",
    otherKey: "challenge_id",
    as: "voted_challenges"
});

// Many-to-Many relationship between Challenge and User via 'vote_challenge' join table
// Allows tracking which users voted for a given challenge
// The alias 'challenge_voters' gives access to users who voted for a challenge
Challenge.belongsToMany(User, {
    through: "vote_challenge",
    foreignKey: "challenge_id",
    otherKey: "user_id",
    as: "challenge_voters"
});

// Many-to-Many relationship between VideoSubmit and User via 'vote_video' join table
// A user can vote for many videos, and a video can receive votes from many users
// The alias 'video_voters' gives access to users who voted for a video
VideoSubmit.belongsToMany(User, {
    through: "vote_video",
    foreignKey: "video_id",
    otherKey: "user_id",
    as: "video_voters"
});

// Many-to-Many relationship between User and VideoSubmit via 'vote_video' join table
// Allows tracking which videos a user has voted for
// The alias 'voted_videos' gives access to videos voted by a user
User.belongsToMany(VideoSubmit, {
    through: "vote_video",
    foreignKey: "user_id",
    otherKey: "video_id",
    as: "voted_videos"
});

// A Challenge can have many VideoSubmits (one-to-many)
// The alias 'videos' allows access to all videos for a challenge
Challenge.hasMany(VideoSubmit, {
    foreignKey: "challenge_id",
    as: "videos"
});

// A VideoSubmit belongs to a Challenge (many-to-one)
// The alias 'challenge' allows access to the challenge for a video
VideoSubmit.belongsTo(Challenge, {
    foreignKey: "challenge_id",
    as: "challenge"
});

// A User can have many VideoSubmits (one-to-many)
// The alias 'videos' allows access to all videos submitted by a user
User.hasMany(VideoSubmit, {
    foreignKey: "user_id",
    as: "videos"
});

// A VideoSubmit belongs to a User (many-to-one)
// The alias 'user' allows access to the user who submitted the video
VideoSubmit.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
}); 

// A Game has one ImageSubmit (one-to-one)
// The alias 'image' allows access to the image for a game
Game.hasOne(ImageSubmit, {
  foreignKey: "game_id",
  as: "image", // singular
});

// An ImageSubmit belongs to a Game (one-to-one)
// The alias 'game' allows access to the game for an image
ImageSubmit.belongsTo(Game, {
  foreignKey: "game_id",
  as: "game",
});

export {
    User,
    Game,
    Challenge,
    VideoSubmit,
    ImageSubmit,
    sequelize
};

