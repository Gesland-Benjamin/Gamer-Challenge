import { User, Challenge, Participation, Game, sequelize } from "../app/models/index.js";
import argon2 from "argon2";

console.log("🚧 Insertion des données de seed dans les tables");

// Création des utilisateurs
const user1 = await User.create({
    username: "alice",
    email: "alice@example.com",
    password: await argon2.hash("password1"),
    role: "admin"
});
const user2 = await User.create({
    username: "bob",
    email: "bob@example.com",
    password: await argon2.hash("password2")
});
const user3 = await User.create({
    username: "charlie",
    email: "charlie@example.com",
    password: await argon2.hash("password3")
});

// Création des jeux
const game1 = await Game.create({
    name: "Jeu 1",
    description: "Description du Jeu 1",
    genre: "Action",
    release_year: new Date('2020-01-01'),
    picture: "http://example.com/jeu1.jpg"
});
const game2 = await Game.create({
    name: "Jeu 2",
    description: "Description du Jeu 2",
    genre: "Aventure",
    release_year: new Date('2021-01-01'),
    picture: "http://example.com/jeu2.jpg"
});
const game3 = await Game.create({
    name: "Jeu 3",
    description: "Description du Jeu 3",
    genre: "Puzzle",
    release_year: new Date('2022-01-01'),
    picture: "http://example.com/jeu3.jpg"
});

// Création des défis (Challenge) : on utilise username et pas user_id
const challenge1 = await Challenge.create({
    name: "Défi 1",
    description: "Description du Défi 1",
    picture: "http://example.com/defi1.jpg",
    release_date: new Date(),
    game_id: game1.id,
    username: user1.username
});
const challenge2 = await Challenge.create({
    name: "Défi 2",
    description: "Description du Défi 2",
    picture: "http://example.com/defi2.jpg",
    release_date: new Date(),
    game_id: game2.id,
    username: user2.username
});
const challenge3 = await Challenge.create({
    name: "Défi 3",
    description: "Description du Défi 3",
    picture: "http://example.com/defi3.jpg",
    release_date: new Date(),
    game_id: game3.id,
    username: user3.username
});

// Création des participations
const participation1 = await Participation.create({
    title: "Participation 1",
    user_id: user1.id,
    challenge_id: challenge1.id,
    url: "http://example.com/participation1.jpg"
});
const participation2 = await Participation.create({
    title: "Participation 2",
    user_id: user2.id,
    challenge_id: challenge2.id,
    url: "http://example.com/participation2.jpg"
});
const participation3 = await Participation.create({
    title: "Participation 3",
    user_id: user3.id,
    challenge_id: challenge3.id,
    url: "http://example.com/participation3.jpg"
});

console.log("✅ Insertion des données de seed terminée");
await sequelize.close();