import { User, Challenge, VideoSubmit, Game, sequelize } from "../app/models/index.js";
import argon2 from "argon2";

console.log("🚧 Insertion des données de seed dans les tables");

// Création des utilisateurs
const user1 = await User.create({
    username: "alice",
    mail: "alice@example.com",
    password: await argon2.hash("password1"),
    role: "admin"
});
const user2 = await User.create({
    username: "bob",
    mail: "bob@example.com",
    password: await argon2.hash("password2")
});
const user3 = await User.create({
    username: "charlie",
    mail: "charlie@example.com",
    password: await argon2.hash("password3")
});
const user4 = await User.create({
    username: "david",
    mail: "david@example.com",
    password: await argon2.hash("password4")
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
    user_id: user1.id,
    username: user1.username
});
const challenge2 = await Challenge.create({
    name: "Défi 2",
    description: "Description du Défi 2",
    picture: "http://example.com/defi2.jpg",
    release_date: new Date(),
    game_id: game2.id,
    user_id: user2.id,
    username: user2.username
});
const challenge3 = await Challenge.create({
    name: "Défi 3",
    description: "Description du Défi 3",
    picture: "http://example.com/defi3.jpg",
    release_date: new Date(),
    game_id: game3.id,
    user_id: user3.id,
    username: user3.username
});
const challenge4 = await Challenge.create({
    name: "Défi 4",
    description: "Description du Défi 4",
    picture: "http://example.com/defi4.jpg",
    release_date: new Date(),
    game_id: game1.id,
    user_id: user4.id,
    username: user4.username
});
const challenge5 = await Challenge.create({
    name: "Défi 5",
    description: "Description du Défi 5",
    picture: "http://example.com/defi5.jpg",
    release_date: new Date(),
    game_id: game2.id,
    user_id: user1.id,
    username: user1.username
});
const challenge6 = await Challenge.create({
    name: "Défi 6",
    description: "Description du Défi 6",
    picture: "http://example.com/defi6.jpg",
    release_date: new Date(),
    game_id: game3.id,
    user_id: user2.id,
    username: user2.username
});
const challenge7 = await Challenge.create({
    name: "Défi 7",
    description: "Description du Défi 7",
    picture: "http://example.com/defi7.jpg",
    release_date: new Date(),
    game_id: game1.id,
    user_id: user3.id,
    username: user3.username
});
const challenge8 = await Challenge.create({
    name: "Défi 8",
    description: "Description du Défi 8",
    picture: "http://example.com/defi8.jpg",
    release_date: new Date(),
    game_id: game2.id,
    user_id: user4.id,
    username: user4.username
});
const challenge9 = await Challenge.create({
    name: "Défi 9",
    description: "Description du Défi 9",
    picture: "http://example.com/defi9.jpg",
    release_date: new Date(),
    game_id: game3.id,
    user_id: user1.id,
    username: user1.username
});
const challenge10 = await Challenge.create({
    name: "Défi 10",
    description: "Description du Défi 10",
    picture: "http://example.com/defi10.jpg",
    release_date: new Date(),
    game_id: game1.id,
    user_id: user2.id,
    username: user2.username
});
const challenge11 = await Challenge.create({
    name: "Défi 11",
    description: "Description du Défi 11",
    picture: "http://example.com/defi11.jpg",
    release_date: new Date(),
    game_id: game2.id,
    user_id: user3.id,
    username: user3.username
});
const challenge12 = await Challenge.create({
    name: "Défi 12",
    description: "Description du Défi 12",
    picture: "http://example.com/defi12.jpg",
    release_date: new Date(),
    game_id: game3.id,
    user_id: user4.id,
    username: user4.username
});
const challenge13 = await Challenge.create({
    name: "Défi 13",
    description: "Description du Défi 13",
    picture: "http://example.com/defi13.jpg",
    release_date: new Date(),
    game_id: game1.id,
    user_id: user1.id,
    username: user1.username
});
const challenge14 = await Challenge.create({
    name: "Défi 14",
    description: "Description du Défi 14",
    picture: "http://example.com/defi14.jpg",
    release_date: new Date(),
    game_id: game2.id,
    user_id: user2.id,
    username: user2.username
});
const challenge15 = await Challenge.create({
    name: "Défi 15",
    description: "Description du Défi 15",
    picture: "http://example.com/defi15.jpg",
    release_date: new Date(),
    game_id: game3.id,
    user_id: user3.id,
    username: user3.username
});
const challenge16 = await Challenge.create({
    name: "Défi 16",
    description: "Description du Défi 16",
    picture: "http://example.com/defi16.jpg",
    release_date: new Date(),
    game_id: game1.id,
    user_id: user4.id,
    username: user4.username
});


// Création des participations
const VideoSubmit1 = await VideoSubmit.create({
    title: "video 1",
    user_id: user1.id,
    challenge_id: challenge1.id,
    url: "http://example.com/video1.jpg"
});
const VideoSubmit2 = await VideoSubmit.create({
    title: "video 2",
    user_id: user2.id,
    challenge_id: challenge2.id,
    url: "http://example.com/video2.jpg"
});
const VideoSubmit3 = await VideoSubmit.create({
    title: "video 3",
    user_id: user3.id,
    challenge_id: challenge3.id,
    url: "http://example.com/video3.jpg"
});


// add vote to challenge
await user2.addVoted_challenges(challenge2);
await user3.addVoted_challenges([challenge2, challenge3]);
await user1.addVoted_challenges([challenge1, challenge2, challenge3]);
await user4.addVoted_challenges(challenge2);


console.log("✅ Insertion des données de seed terminée");
await sequelize.close();