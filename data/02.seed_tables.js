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
    name: "CYBERPUNK 2077",
    description: "Cyberpunk 2077 est un jeu vidéo de rôle et d’action en monde ouvert développé par CD Projekt Red, situé dans la mégalopole futuriste de Night City, le joueur incarne V, un mercenaire à la recherche d’un implant unique qui pourrait offrir l’immortalité, le jeu propose des quêtes principales et secondaires, un système de personnalisation avancé du personnage, des choix moraux impactant l’histoire, et des combats mêlant armes à feu, piratage et capacités cybernétiques.",
    genre: "Action-RPG, monde ouvert",
    release_year: new Date('2020'),
    picture: "cyberpunkcover.jpeg"
});
const game2 = await Game.create({
    name: "GTA VI",
    description: "Plongez dans l'univers de Grand Theft Auto VI, la dernière itération de la saga emblématique de Rockstar Games. Situé dans l'État fictif de Leonida, inspiré de la Floride, le jeu vous invite à explorer des environnements variés, allant des plages animées de Vice City aux marais mystérieux des Leonida Key",
    genre: "Action-aventure",
    release_year: new Date('2026'),
    picture: "gtacover.jpg"
});
const game3 = await Game.create({
    name: "ANIMAL CROSSING: NEW HORIZONS",
    description: "Dans Animal Crossing: New Horizons, le joueur incarne un personnage qui emménage sur une île déserte, avec pour objectif de créer et personnaliser son village idéal. Le jeu propose un cycle jour/nuit et saisons dynamiques, des interactions avec des villageois animaux, la pêche, la chasse aux insectes, la décoration et la gestion des ressources. Grâce à son rythme relaxant et sa liberté totale, le jeu offre une expérience immersive et créative, idéale pour les joueurs de tous âges.",
    genre: "Simulation de vie",
    release_year: new Date('2020'),
    picture: "animalcrossingcover.jpg"
});
const game4 = await Game.create({
    name: "MARIO KART 8",
    description: "Mario Kart est un jeu de course emblématique où les personnages de l’univers Nintendo s’affrontent sur des circuits hauts en couleur. Les joueurs peuvent utiliser des objets spéciaux pour ralentir leurs adversaires ou se propulser en tête de course, rendant chaque partie imprévisible et dynamique. Avec de nombreux circuits, modes de jeu variés et un mode multijoueur en ligne ou local, Mario Kart offre une expérience accessible, compétitive et divertissante pour tous les âges.",
    genre: "Course, multijoueur",
    release_year: new Date('2023'),
    picture: "mariokartcover.jpg"
});
const game5 = await Game.create({
    name: "RED DEAD REDEMPTION 2",
    description: "Red Dead Redemption 2 plonge le joueur dans l’Ouest américain à la fin du XIXᵉ siècle. Vous incarnez Arthur Morgan, membre du gang de Dutch van der Linde, naviguant entre loyauté et survie dans un monde ouvert vivant et immersif. Le jeu propose des quêtes principales et secondaires, des interactions riches avec les personnages, des activités variées (chasse, pêche, équitation) et un scénario profond mêlant action, drame et exploration. L’expérience combine liberté, réalisme et narration cinématographique, offrant une immersion totale dans l’univers du Far West.",
    genre: "Action-aventure",
    release_year: new Date('2018'),
    picture: "reddeadcover.jpg"
});
const game6 = await Game.create({
    name: "DAYS GONE",
    description: "Dans Days Gone, vous incarnez Deacon St. John, un ancien membre d’un gang de motards, qui tente de survivre dans un monde post-apocalyptique ravagé par une pandémie transformant les humains en créatures appelées “Freakers”. Le jeu propose un vaste monde ouvert à explorer, des combats contre les Freakers et d’autres survivants, ainsi que la gestion de ressources et de véhicules. Avec son atmosphère immersive, son scénario centré sur la survie et ses choix moraux, Days Gone offre une expérience intense et cinématographique dans un environnement hostile et impitoyable.",
    genre: "Action-aventure, survie",
    release_year: new Date('2019'),
    picture: "daysgonecover.jpg"
});
const game7 = await Game.create({
    name: "NARUTO SHIPPUDEN: ULTIMATE NINJA STORM",
    description: "Naruto Shippuden: Ultimate Ninja Storm est un jeu de combat qui plonge le joueur dans l’univers du célèbre manga Naruto. Incarnez Naruto, Sasuke et d’autres personnages emblématiques et participez à des combats dynamiques en 3D, fidèles aux techniques et jutsus de la série. Le jeu propose des modes solo et multijoueur, des cinématiques immersives racontant les arcs principaux du manga, et un gameplay mêlant stratégie, vitesse et combos spectaculaires. Grâce à ses graphismes colorés et son ambiance fidèle à l’anime, Naruto Storm offre une expérience divertissante pour les fans de la saga et les amateurs de jeux de combat.",
    genre: "Combat, action",
    release_year: new Date('2008'),
    picture: "narutostormcover.jpg"
});
const game8 = await Game.create({
    name: "TEKKEN 8",
    description: "Tekken 8 marque le retour triomphal de la saga emblématique de jeux de combat en 3D. Développé sur Unreal Engine 5, le jeu offre des graphismes époustouflants et des animations fluides, mettant en valeur les combats intenses et les personnages détaillés. L'histoire poursuit la tragique saga des Mishima, centrée sur le face-à-face entre Jin Kazama et Kazuya Mishima, avec des rebondissements inattendus et des révélations familiales. Le gameplay introduit le système Heat, amplifiant l'agressivité et la stratégie en combat, tout en conservant les mécaniques classiques qui ont fait le succès de la série. Avec plus de 32 personnages jouables, dont des retours iconiques et de nouveaux venus, Tekken 8 promet une expérience de jeu riche et dynamique, que ce soit en solo ou en ligne.",
    genre: "Combat",
    release_year: new Date('2024'),
    picture: "tekken8cover.jpg"
});
const game9 = await Game.create({
    name: "Dofus",
    description: "Dofus est un jeu de rôle massivement multijoueur en ligne (MMORPG) se déroulant dans le monde fantastique du Krosmoz. Les joueurs incarnent des personnages de différentes classes et races, chacun avec ses compétences uniques, et partent à l’aventure pour retrouver les légendaires œufs de dragon appelés Dofus. Le jeu combine exploration, quêtes, combats tactiques au tour par tour et interactions sociales avec d’autres joueurs. Avec ses graphismes en 2D colorés et son univers riche, Dofus offre une expérience immersive, stratégique et communautaire, adaptée aux fans de jeux de rôle et d’aventure.",
    genre: "MMORPG, stratégie, aventure",
    release_year: new Date('2004'),
    picture: "dofuscover.jpg"
});
const game10 = await Game.create({
    name: "DISNEY DREAMLIGHT VALLEY",
    description: "Disney Dreamlight Valley est un jeu hybride mêlant simulation de vie et aventure, où les joueurs sont invités à restaurer un vallon magique envahi par des ronces malveillantes. Incarnez un personnage personnalisable et explorez des royaumes inspirés des univers Disney et Pixar, tels que La Belle et la Bête, Inside Out, Peter Pan et Aladdin. Au fil de l'aventure, vous rencontrerez des personnages emblématiques, résoudrez des énigmes et participerez à des quêtes captivantes pour redonner vie à la vallée.",
    genre: "Simulation de vie, aventure",
    release_year: new Date('2023'),
    picture: "disneydreamlightcover.jpg"
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
    release_date: new Date(2025, 0, 10),
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