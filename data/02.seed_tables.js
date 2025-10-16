import { User, Challenge, VideoSubmit, Game, sequelize } from "../app/models/index.js";
import argon2 from "argon2";

console.log("🚧 Insertion des données de seed dans les tables");

// Création des utilisateurs
const user1 = await User.create({
    username: "alice",
    mail: "alice@example.com",
    password: await argon2.hash("password1"),
    role: "admin",
    picture : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flepassetempsderose.l.e.pic.centerblog.net%2Fo%2Faed26788.jpg&f=1&nofb=1&ipt=dcdddae0fc7ca8ba1ecbab1ddb781f74146d86320a8c3c9d0f322f168c2ef69e"
});
const user2 = await User.create({
    username: "bob",
    mail: "bob@example.com",
    password: await argon2.hash("password2"),
    picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fdropthespotlight.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fundertaker.jpg%3Ffit%3D960%2C960%26ssl%3D1&f=1&nofb=1&ipt=45e1f3a51c6b2de757328c1a113837158609da227d68b8ad53e2d664c3c671c3",
    youtube_url: "https://www.youtube.com/",
    twitch_url: "https://www.twitch.tv/",
    discord_url: "https://discord.com/"

});
const user3 = await User.create({
    username: "charlie",
    mail: "charlie@example.com",
    password: await argon2.hash("password3"),
    isBanned: true,
    picture : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstaticg.sportskeeda.com%2Feditor%2F2023%2F04%2F5a0bc-16823053913430-1920.jpg&f=1&nofb=1&ipt=cf54f2619dae66f5d9df9d4863327807f248782c2307ec1e1c8a8a701b750cdd"
});
const user4 = await User.create({
    username: "david",
    mail: "david@example.com",
    password: await argon2.hash("password4"),
    picture : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmario.wiki.gallery%2Fimages%2F1%2F15%2FPlay_Nintendo_Mario_Profile.png&f=1&nofb=1&ipt=23e580afb4f05a902b75840aae4373eae24833972e1e8688515452c854b1ae8b",
    
});

// Création des jeux
const game1 = await Game.create({
    name: "CYBERPUNK 2077",
    description: "Cyberpunk 2077 est un jeu vidéo de rôle et d’action en monde ouvert développé par CD Projekt Red, situé dans la mégalopole futuriste de Night City, le joueur incarne V, un mercenaire à la recherche d’un implant unique qui pourrait offrir l’immortalité, le jeu propose des quêtes principales et secondaires, un système de personnalisation avancé du personnage, des choix moraux impactant l’histoire, et des combats mêlant armes à feu, piratage et capacités cybernétiques.",
    genre: "Action-RPG, monde ouvert",
    release_year: new Date('2020'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaam3.webp"
});
const game2 = await Game.create({
    name: "GTA VI",
    description: "Plongez dans l'univers de Grand Theft Auto VI, la dernière itération de la saga emblématique de Rockstar Games. Situé dans l'État fictif de Leonida, inspiré de la Floride, le jeu vous invite à explorer des environnements variés, allant des plages animées de Vice City aux marais mystérieux des Leonida Key",
    genre: "Action-aventure",
    release_year: new Date('2026'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rwo.webp"
});
const game3 = await Game.create({
    name: "ELDEN RING",
    description: "Elden Ring est un jeu vidéo d'action-RPG développé par FromSoftware, connu pour son monde ouvert vaste et interconnecté. Les joueurs explorent un royaume fantastique rempli de créatures redoutables, de donjons mystérieux et de quêtes épiques. Le système de combat est fluide et exigeant, avec une grande variété d'armes et de compétences à maîtriser. L'histoire, coécrite par George R.R. Martin, plonge les joueurs dans un univers riche en lore et en mythologie.",
    genre: "Action-RPG, monde ouvert",
    release_year: new Date('2022'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp"
});
const game4 = await Game.create({
    name: "MARIO KART 8",
    description: "Mario Kart est un jeu de course emblématique où les personnages de l’univers Nintendo s’affrontent sur des circuits hauts en couleur. Les joueurs peuvent utiliser des objets spéciaux pour ralentir leurs adversaires ou se propulser en tête de course, rendant chaque partie imprévisible et dynamique. Avec de nombreux circuits, modes de jeu variés et un mode multijoueur en ligne ou local, Mario Kart offre une expérience accessible, compétitive et divertissante pour tous les âges.",
    genre: "Course, multijoueur",
    release_year: new Date('2023'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co213q.webp"
});
const game5 = await Game.create({
    name: "GHOST OF YOTEI",
    description: "Ghost of Yotei est un jeu d'action-aventure qui plonge le joueur dans un monde ouvert inspiré de la mythologie japonaise. Incarnez un guerrier solitaire en quête de rédemption, affrontant des créatures surnaturelles et des ennemis redoutables. Le jeu propose un système de combat fluide, des énigmes environnementales et une narration immersive, le tout dans un cadre visuellement époustouflant. Explorez des paysages variés, des forêts luxuriantes aux montagnes enneigées, tout en découvrant les secrets de Yotei.",
    genre: "Action-aventure",
    release_year: new Date('2025'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9coo.webp"
});
const game6 = await Game.create({
    name: "DAYS GONE",
    description: "Dans Days Gone, vous incarnez Deacon St. John, un ancien membre d’un gang de motards, qui tente de survivre dans un monde post-apocalyptique ravagé par une pandémie transformant les humains en créatures appelées “Freakers”. Le jeu propose un vaste monde ouvert à explorer, des combats contre les Freakers et d’autres survivants, ainsi que la gestion de ressources et de véhicules. Avec son atmosphère immersive, son scénario centré sur la survie et ses choix moraux, Days Gone offre une expérience intense et cinématographique dans un environnement hostile et impitoyable.",
    genre: "Action-aventure, survie",
    release_year: new Date('2019'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co94bn.webp"
});
const game7 = await Game.create({
    name: "FINAL FANTASY 7",
    description: "Final Fantasy 7 est un jeu de rôle emblématique qui suit l'histoire de Cloud Strife, un mercenaire engagé par un groupe de résistance pour combattre la méga-corporation Shinra. Avec son monde vaste et immersif, ses personnages mémorables et son système de combat innovant, le jeu a redéfini le genre JRPG. Les joueurs explorent des environnements variés, participent à des quêtes épiques et découvrent les secrets de l'univers de Gaia. Grâce à sa narration profonde et à sa bande-son inoubliable, Final Fantasy 7 reste l'un des jeux les plus appréciés de tous les temps.",
    genre: "RPG, aventure",
    release_year: new Date('2020'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qxr.webp"
});
const game8 = await Game.create({
    name: "SILENT HILL 2",
    description: "Silent Hill 2 est un jeu d'horreur psychologique qui suit l'histoire de James Sunderland, un homme à la recherche de sa femme décédée dans la mystérieuse ville de Silent Hill. Le jeu est connu pour son atmosphère oppressante, ses énigmes complexes et ses thèmes profonds liés à la culpabilité et au chagrin. Les joueurs explorent des environnements cauchemardesques, rencontrent des créatures terrifiantes et découvrent des éléments narratifs qui les poussent à remettre en question la réalité. Avec sa bande-son immersive et son esthétique unique, Silent Hill 2 est considéré comme l'un des meilleurs jeux d'horreur de tous les temps.",
    genre: "Horreur, aventure",
    release_year: new Date('2025'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5l7s.webp"
});
const game9 = await Game.create({
    name: "RESIDENT EVIL 4 REMAKE",
    description: "Resident Evil 4 Remake est une réimagination du classique jeu d'action-aventure et d'horreur de survie. Les joueurs incarnent Leon S. Kennedy, un agent du gouvernement américain, qui est envoyé en Europe pour sauver la fille du président, Ashley Graham, kidnappée par un culte mystérieux. Le jeu se déroule dans un village isolé, où Leon doit affronter des ennemis terrifiants, résoudre des énigmes et survivre à des situations de plus en plus intenses. Avec des graphismes améliorés, un gameplay repensé et une atmosphère immersive, Resident Evil 4 Remake vise à capturer l'essence du jeu original tout en offrant une expérience moderne et captivante.",
    genre: "Action, aventure, horreur",
    release_year: new Date('2023'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6bo0.webp"
});
const game10 = await Game.create({
    name: "BLOODBORNE",
    description: "Bloodborne est un jeu d'action-RPG développé par FromSoftware, se déroulant dans un univers gothique et cauchemardesque. Les joueurs incarnent un chasseur de monstres dans la ville maudite de Yharnam, où ils doivent affronter des créatures terrifiantes et des ennemis redoutables. Le jeu est connu pour son gameplay rapide et agressif, son atmosphère immersive et son histoire cryptique. Les joueurs peuvent personnaliser leur personnage, améliorer leurs compétences et explorer des environnements interconnectés remplis de secrets et de défis. Avec son esthétique unique et son ambiance oppressante, Bloodborne est considéré comme l'un des meilleurs jeux de la génération.",
    genre: "Action-RPG, horreur",
    release_year: new Date('2015'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.webp"
});
const game11 = await Game.create({
    name: "SEKIRO: SHADOWS DIE TWICE",
    description: "Sekiro: Shadows Die Twice est un jeu d'action-aventure développé par FromSoftware, se déroulant dans un Japon féodal fictif. Les joueurs incarnent un shinobi nommé Wolf, qui doit sauver son maître kidnappé et venger sa famille. Le jeu se distingue par son système de combat exigeant, mettant l'accent sur la précision et la stratégie. Les joueurs peuvent explorer un monde interconnecté, rempli de secrets, d'ennemis redoutables et de boss épiques. Avec son esthétique unique, son gameplay innovant et sa narration immersive, Sekiro a reçu des éloges critiques et a remporté plusieurs prix, dont le titre de Jeu de l'année.",
    genre: "Action-aventure, RPG",
    release_year: new Date('2021'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2a23.webp"
});
const game12 = await Game.create({
    name: "GOD OF WAR RAGNAROK",
    description: "God of War Ragnarök est un jeu d'action-aventure développé par Santa Monica Studio et publié par Sony Interactive Entertainment. Suite directe de God of War (2018), le jeu suit les aventures de Kratos et de son fils Atreus alors qu'ils naviguent à travers les neuf royaumes de la mythologie nordique. Les joueurs doivent affronter de nouveaux ennemis, résoudre des énigmes et découvrir des secrets tout en explorant des environnements magnifiques et variés. Avec un système de combat amélioré, une narration immersive et des graphismes époustouflants, God of War Ragnarök promet d'offrir une expérience inoubliable aux fans de la franchise.",
    genre: "Action-aventure, RPG",
    release_year: new Date('2022'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.webp"
});

const game13 = await Game.create({
    name: "MAFIA: THE OLD COUNTRY",
    description: "Mafia: The Old Country est un jeu d'action-aventure en monde ouvert qui plonge les joueurs dans l'univers du crime organisé des années 1930 en Sicile. Incarnez un jeune homme cherchant à gravir les échelons de la pègre tout en naviguant entre loyauté, trahison et pouvoir. Le jeu offre une narration cinématographique, des fusillades intenses et une reconstitution historique immersive.",
    genre: "Action-aventure, monde ouvert",
    release_year: new Date('2025'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa9dq.webp"
});


const game14 = await Game.create({
    name: "THE ELDER SCROLLS V: SKYRIM",
    description: "The Elder Scrolls V: Skyrim est un RPG en monde ouvert développé par Bethesda Game Studios. Les joueurs incarnent le Dovahkiin, un héros capable d’absorber les âmes des dragons. Explorez la province de Bordeciel, accomplissez des quêtes épiques, rejoignez des guildes et façonnez votre destin dans un univers riche et vivant.",
    genre: "RPG, monde ouvert, fantasy",
    release_year: new Date('2011'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnw.webp"
});


const game15 = await Game.create({
    name: "THE ELDER SCROLLS IV: OBLIVION",
    description: "The Elder Scrolls IV: Oblivion est un jeu de rôle en monde ouvert acclamé par la critique. Plongez dans le royaume impérial de Cyrodiil et combattez les forces démoniaques venues d’Oblivion. Grâce à sa liberté d’exploration, ses quêtes profondes et son univers immersif, Oblivion a redéfini le genre RPG occidental.",
    genre: "RPG, monde ouvert, fantasy",
    release_year: new Date('2006'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8fpz.webp"
});

const game16 = await Game.create({
    name: "THE WITCHER 3: WILD HUNT",
    description: "The Witcher 3: Wild Hunt est un RPG en monde ouvert développé par CD Projekt Red. Incarnez Geralt de Riv, un sorceleur chasseur de monstres, dans une quête épique à travers des royaumes déchirés par la guerre. Avec ses choix moraux, ses quêtes complexes et ses graphismes somptueux, le jeu est considéré comme une référence du genre.",
    genre: "Action-RPG, monde ouvert, fantasy",
    release_year: new Date('2015'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.webp"
});


const game17 = await Game.create({
    name: "EXPEDITION 33",
    description: "Expedition 33 est un jeu d'aventure narratif et stratégique qui suit un groupe d'explorateurs dans un monde post-apocalyptique mystérieux. Mélangeant exploration, combat tactique et choix narratifs, le jeu met l'accent sur la survie, la découverte et la gestion d'équipe au sein d'environnements magnifiques mais dangereux.",
    genre: "Aventure, stratégie, narration",
    release_year: new Date('2025'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gam.webp"
});


const game18 = await Game.create({
    name: "CRASH BANDICOOT 4: IT’S ABOUT TIME",
    description: "Crash Bandicoot 4: It’s About Time est un jeu de plateforme développé par Toys for Bob. Rejoignez Crash, Coco et leurs amis dans une aventure pleine d’humour et de défis à travers le temps et l’espace. Avec de nouveaux pouvoirs, des graphismes colorés et une difficulté stimulante, ce titre modernise la formule classique de la série.",
    genre: "Plateforme, action, aventure",
    release_year: new Date('2020'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2hp4.webp"
});


const game19 = await Game.create({
    name: "GOAT SIMULATOR 3",
    description: "Goat Simulator 3 est un jeu de simulation humoristique où les joueurs incarnent une chèvre dans un monde ouvert chaotique. Cassez tout sur votre passage, expérimentez des situations absurdes et invitez vos amis pour des parties multijoueur délirantes. C’est une expérience absurde et hilarante qui ne se prend jamais au sérieux.",
    genre: "Simulation, bac à sable, humour",
    release_year: new Date('2022'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4uks.webp"
});


const game20 = await Game.create({
    name: "VALORANT",
    description: "Valorant est un jeu de tir tactique à la première personne développé par Riot Games. Mélangeant stratégie, précision et compétences uniques de chaque agent, le jeu met l'accent sur le travail d’équipe et la compétition. Chaque partie est un affrontement intense où la coordination et la maîtrise des capacités font la différence.",
    genre: "FPS, tactique, multijoueur compétitif",
    release_year: new Date('2020'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa7oc.webp"
});


const game21 = await Game.create({
    name: "GRAN TURISMO 7",
    description: "Gran Turismo 7 est un jeu de simulation automobile développé par Polyphony Digital. Offrant un réalisme exceptionnel, une collection impressionnante de voitures et de circuits du monde entier, il s’adresse aux passionnés de course. Le jeu combine réalisme technique, personnalisation approfondie et sensations de conduite authentiques.",
    genre: "Course, simulation, réalisme",
    release_year: new Date('2022'),
    picture: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2g84.webp"
});



// Création des challenges

/*CYBERPUNK 2077*/
const challenge1 = await Challenge.create({
    name: "Légende de Night City",
    description: "Atteignez le niveau de réputation maximale dans Night City et devenez une véritable légende urbaine.",
    picture: game1.picture,
    release_date: new Date(),
    game_id: game1.id,
    user_id: user1.id,
    username: user1.username
});

const challenge2 = await Challenge.create({
    name: "Pirate suprême",
    description: "Neutralisez 50 ennemis à l’aide de piratages rapides. Montrez votre maîtrise du netrunning.",
    picture: game1.picture,
    release_date: new Date(),
    game_id: game1.id,
    user_id: user1.id,
    username: user1.username
});

const challenge3 = await Challenge.create({
    name: "La fin du chemin",
    description: "Terminez la mission finale de l’histoire principale et découvrez le destin de V.",
    picture: game1.picture,
    release_date: new Date(),
    game_id: game1.id,
    user_id: user1.id,
    username: user1.username
});

/*GTA VI*/

const challenge4 = await Challenge.create({
    name: "Roi de Leonida",
    description: "Prenez le contrôle de tous les territoires de Leonida et dominez le crime organisé.",
    picture: game2.picture,
    release_date: new Date(),
    game_id: game2.id,
    user_id: user1.id,
    username: user1.username
});

const challenge5 = await Challenge.create({
    name: "Casseur de coffres",
    description: "Réalisez 10 braquages majeurs sans être arrêté par la police.",
    picture: game2.picture,
    release_date: new Date(),
    game_id: game2.id,
    user_id: user1.id,
    username: user1.username
});

const challenge6 = await Challenge.create({
    name: "Fuite parfaite",
    description: "Échappez à une poursuite de niveau 5 étoiles sans subir de dégâts critiques.",
    picture: game2.picture,
    release_date: new Date(),
    game_id: game2.id,
    user_id: user1.id,
    username: user1.username
});
/*ELDEN RING*/

const challenge7 = await Challenge.create({
    name: "Seigneur d’Elden",
    description: "Terminez la quête principale et devenez le Seigneur d’Elden.",
    picture: game3.picture,
    release_date: new Date(),
    game_id: game3.id,
    user_id: user1.id,
    username: user1.username
});

const challenge8 = await Challenge.create({
    name: "Dompteur d’étoiles",
    description: "Vainquez le Général Radahn lors du festival de Caelid.",
    picture: game3.picture,
    release_date: new Date(),
    game_id: game3.id,
    user_id: user1.id,
    username: user1.username
});

const challenge9 = await Challenge.create({
    name: "L’Âge des étoiles",
    description: "Obtenez la fin secrète liée à Ranni et libérez l’Entre-Terre de son destin.",
    picture: game3.picture,
    release_date: new Date(),
    game_id: game3.id,
    user_id: user1.id,
    username: user1.username
});

/*MARIO KART 8*/

const challenge10 = await Challenge.create({
    name: "Champion du Grand Prix",
    description: "Remportez la coupe spéciale en difficulté 200cc.",
    picture: game4.picture,
    release_date: new Date(),
    game_id: game4.id,
    user_id: user1.id,
    username: user1.username
});

const challenge11 = await Challenge.create({
    name: "Maître du dérapage",
    description: "Effectuez 100 boosts parfaits en drift.",
    picture: game4.picture,
    release_date: new Date(),
    game_id: game4.id,
    user_id: user1.id,
    username: user1.username
});

const challenge12 = await Challenge.create({
    name: "Sans faute",
    description: "Gagnez 4 courses d’affilée sans tomber ni être touché par un objet.",
    picture: game4.picture,
    release_date: new Date(),
    game_id: game4.id,
    user_id: user1.id,
    username: user1.username
});


/*GHOST OF TSUSHIMA*/

const challenge13 = await Challenge.create({
    name: "Le fantôme de Tsushima",
    description: "Terminez toutes les quêtes principales et devenez une légende sur l’île.",
    picture: game5.picture,
    release_date: new Date(),
    game_id: game5.id,
    user_id: user1.id,
    username: user1.username
});

const challenge14 = await Challenge.create({
    name: "Maître du katana",
    description: "Débloquez toutes les postures et remportez 50 duels.",
    picture: game5.picture,
    release_date: new Date(),
    game_id: game5.id,
    user_id: user1.id,
    username: user1.username
});

const challenge15 = await Challenge.create({
    name: "Souffle du vent",
    description: "Explorez 100 % de la carte et trouvez tous les sanctuaires.",
    picture: game5.picture,
    release_date: new Date(),
    game_id: game5.id,
    user_id: user1.id,
    username: user1.username
});

/*DAYS GONE*/

const challenge16 = await Challenge.create({
    name: "Chasseur de hordes",
    description: "Éliminez toutes les hordes présentes dans la région.",
    picture: game6.picture,
    release_date: new Date(),
    game_id: game6.id,
    user_id: user1.id,
    username: user1.username
});

const challenge17 = await Challenge.create({
    name: "Survivant ultime",
    description: "Survivez à 10 vagues d’ennemis sans mourir ni vous cacher.",
    picture: game6.picture,
    release_date: new Date(),
    game_id: game6.id,
    user_id: user1.id,
    username: user1.username
});

const challenge18 = await Challenge.create({
    name: "Rider de l’apocalypse",
    description: "Personnalisez votre moto au maximum et parcourez 500 km sans tomber.",
    picture: game6.picture,
    release_date: new Date(),
    game_id: game6.id,
    user_id: user1.id,
    username: user1.username
});

/*FINAL FANTASY 7 REMAKE*/

const challenge19 = await Challenge.create({
    name: "Héros de Midgar",
    description: "Terminez la mission principale de Midgar et sauvez le secteur 7.",
    picture: game7.picture,
    release_date: new Date(),
    game_id: game7.id,
    user_id: user2.id,
    username: user2.username
});

const challenge20 = await Challenge.create({
    name: "Matraque de choc",
    description: "Débloquez toutes les matérias et maîtrisez leur puissance.",
    picture: game7.picture,
    release_date: new Date(),
    game_id: game7.id,
    user_id: user1.id,
    username: user1.username
});

const challenge21 = await Challenge.create({
    name: "Élu de l’étoile",
    description: "Obtenez la fin canonique du jeu en accomplissant toutes les quêtes secondaires majeures.",
    picture: game7.picture,
    release_date: new Date(),
    game_id: game7.id,
    user_id: user3.id,
    username: user3.username
});

/*SILENT HILL 2*/

const challenge22 = await Challenge.create({
    name: "Cauchemar absolu",
    description: "Terminez le jeu avec la fin « Good + True » en explorant tous les secrets.",
    picture: game8.picture,
    release_date: new Date(),
    game_id: game8.id,
    user_id: user4.id,
    username: user4.username
});

const challenge23 = await Challenge.create({
    name: "Confrontation avec Pyramid Head",
    description: "Vainquez Pyramid Head sans utiliser de médikits.",
    picture: game8.picture,
    release_date: new Date(),
    game_id: game8.id,
    user_id: user2.id,
    username: user2.username
});

const challenge24 = await Challenge.create({
    name: "Journaliste du mystère",
    description: "Collectez tous les journaux et documents secrets de Silent Hill.",
    picture: game8.picture,
    release_date: new Date(),
    game_id: game8.id,
    user_id: user1.id,
    username: user1.username
});

/*RESIDENT EVIL 4 REMAKE*/
const challenge25 = await Challenge.create({
    name: "Agent d’élite",
    description: "Terminez le jeu en difficulté Professional.",
    picture: game9.picture,
    release_date: new Date(),
    game_id: game9.id,
    user_id: user3.id,
    username: user3.username
});

const challenge26 = await Challenge.create({
    name: "Maîtrise des armes",
    description: "Obtenez toutes les armes et améliorez-les au maximum.",
    picture: game9.picture,
    release_date: new Date(),
    game_id: game9.id,
    user_id: user2.id,
    username: user2.username
});

const challenge27 = await Challenge.create({
    name: "Zéro perte",
    description: "Terminez le jeu sans utiliser de herbes ou de soins.",
    picture: game9.picture,
    release_date: new Date(),
    game_id: game9.id,
    user_id: user4.id,
    username: user4.username
});

/*BLOODBORNE*/
const challenge28 = await Challenge.create({
    name: "Chasseur suprême",
    description: "Vainquez le boss final et terminez l’histoire principale.",
    picture: game10.picture,
    release_date: new Date(),
    game_id: game10.id,
    user_id: user1.id,
    username: user1.username
});

const challenge29 = await Challenge.create({
    name: "Collectionneur de secrets",
    description: "Obtenez tous les équipements et runes du jeu.",
    picture: game10.picture,
    release_date: new Date(),
    game_id: game10.id,
    user_id: user2.id,
    username: user2.username
});

const challenge30 = await Challenge.create({
    name: "Maître de la vitesse",
    description: "Vainquez le Cleric Beast en moins de 5 minutes.",
    picture: game10.picture,
    release_date: new Date(),
    game_id: game10.id,
    user_id: user3.id,
    username: user3.username
});

/*SEKIRO: SHADOWS DIE TWICE*/
const challenge31 = await Challenge.create({
    name: "Shinobi invincible",
    description: "Vainquez Isshin, le Seigneur, sans mourir une seule fois.",
    picture: game11.picture,
    release_date: new Date(),
    game_id: game11.id,
    user_id: user4.id,
    username: user4.username
});

const challenge32 = await Challenge.create({
    name: "Maître du katana",
    description: "Maîtrisez toutes les postures et techniques de combat.",
    picture: game11.picture,
    release_date: new Date(),
    game_id: game11.id,
    user_id: user1.id,
    username: user1.username
});

const challenge33 = await Challenge.create({
    name: "Explorateur de Hirata",
    description: "Découvrez tous les secrets et zones cachées du château d’Hirata.",
    picture: game11.picture,
    release_date: new Date(),
    game_id: game11.id,
    user_id: user2.id,
    username: user2.username
});

/*GOD OF WAR RAGNAROK*/

const challenge34 = await Challenge.create({
    name: "Dieu de la guerre",
    description: "Vainquez tous les boss principaux et terminez l’histoire principale.",
    picture: game12.picture,
    release_date: new Date(),
    game_id: game12.id,
    user_id: user3.id,
    username: user3.username
});

const challenge35 = await Challenge.create({
    name: "Maître du Leviathan",
    description: "Débloquez toutes les compétences et améliorations de l’arme Leviathan.",
    picture: game12.picture,
    release_date: new Date(),
    game_id: game12.id,
    user_id: user1.id,
    username: user1.username
});

const challenge36 = await Challenge.create({
    name: "Explorateur des Neuf Royaumes",
    description: "Découvrez tous les secrets et coffres cachés des neuf royaumes.",
    picture: game12.picture,
    release_date: new Date(),
    game_id: game12.id,
    user_id: user4.id,
    username: user4.username
});

/*Mafia: The Old Country*/
const challenge37 = await Challenge.create({
    name: "Boss de la pègre",
    description: "Complétez toutes les missions principales et prenez le contrôle de la mafia.",
    picture: game13.picture,
    release_date: new Date(),
    game_id: game13.id,
    user_id: user2.id,
    username: user2.username
});

const challenge38 = await Challenge.create({
    name: "Collectionneur d’armes",
    description: "Obtenez toutes les armes et véhicules disponibles dans le jeu.",
    picture: game13.picture,
    release_date: new Date(),
    game_id: game13.id,
    user_id: user1.id,
    username: user1.username
});

const challenge39 = await Challenge.create({
    name: "Maître de la discrétion",
    description: "Terminez toutes les missions sans déclencher d’alarme ni attirer la police.",
    picture: game13.picture,
    release_date: new Date(),
    game_id: game13.id,
    user_id: user4.id,
    username: user4.username
});
/*THE ELDER SCROLLS V: SKYRIM*/
const challenge40 = await Challenge.create({
    name: "Dovahkiin légendaire",
    description: "Terminez la quête principale et absorbez l’âme de tous les dragons.",
    picture: game14.picture,
    release_date: new Date(),
    game_id: game14.id,
    user_id: user1.id,
    username: user1.username
});

const challenge41 = await Challenge.create({
    name: "Maître des guildes",
    description: "Rejoignez et terminez toutes les quêtes majeures des guildes.",
    picture: game14.picture,
    release_date: new Date(),
    game_id: game14.id,
    user_id: user3.id,
    username: user3.username
});

const challenge42 = await Challenge.create({
    name: "Explorateur complet",
    description: "Découvrez 100% de la carte et toutes les zones cachées.",
    picture: game14.picture,
    release_date: new Date(),
    game_id: game14.id,
    user_id: user2.id,
    username: user2.username
});
/*THE ELDER SCROLLS IV: OBLIVION*/
const challenge43 = await Challenge.create({
    name: "Chevalier impérial",
    description: "Terminez la quête principale et devenez membre de l’Ordre des Chevaliers.",
    picture: game15.picture,
    release_date: new Date(),
    game_id: game15.id,
    user_id: user4.id,
    username: user4.username
});

const challenge44 = await Challenge.create({
    name: "Maître des sorts",
    description: "Apprenez et maîtrisez tous les sorts du jeu.",
    picture: game15.picture,
    release_date: new Date(),
    game_id: game15.id,
    user_id: user1.id,
    username: user1.username
});

const challenge45 = await Challenge.create({
    name: "Explorateur d’Oblivion",
    description: "Découvrez toutes les dimensions et complétez toutes les quêtes secondaires.",
    picture: game15.picture,
    release_date: new Date(),
    game_id: game15.id,
    user_id: user3.id,
    username: user3.username
});
/*THE WITCHER 3: WILD HUNT*/
const challenge46 = await Challenge.create({
    name: "Chasseur de monstres",
    description: "Tuez tous les monstres de la carte et terminez toutes les missions secondaires.",
    picture: game16.picture,
    release_date: new Date(),
    game_id: game16.id,
    user_id: user2.id,
    username: user2.username
});

const challenge47 = await Challenge.create({
    name: "Maître alchimiste",
    description: "Créez toutes les potions et élixirs disponibles et améliorez-les.",
    picture: game16.picture,
    release_date: new Date(),
    game_id: game16.id,
    user_id: user1.id,
    username: user1.username
});

const challenge48 = await Challenge.create({
    name: "Explorateur de Skellige",
    description: "Découvrez toutes les îles et quêtes cachées des archipels de Skellige.",
    picture: game16.picture,
    release_date: new Date(),
    game_id: game16.id,
    user_id: user4.id,
    username: user4.username
});
/*EXPEDITION 33*/
const challenge49 = await Challenge.create({
    name: "Survivant tactique",
    description: "Terminez la mission principale sans perdre un membre de l’équipe.",
    picture: game17.picture,
    release_date: new Date(),
    game_id: game17.id,
    user_id: user3.id,
    username: user3.username
});

const challenge50 = await Challenge.create({
    name: "Maître stratège",
    description: "Complétez toutes les missions secondaires et les objectifs bonus.",
    picture: game17.picture,
    release_date: new Date(),
    game_id: game17.id,
    user_id: user1.id,
    username: user1.username
});

const challenge51 = await Challenge.create({
    name: "Explorateur du monde perdu",
    description: "Découvrez toutes les zones et secrets du monde post-apocalyptique.",
    picture: game17.picture,
    release_date: new Date(),
    game_id: game17.id,
    user_id: user4.id,
    username: user4.username
});
/*CRASH BANDICOOT 4: IT’S ABOUT TIME*/
const challenge52 = await Challenge.create({
    name: "Tourbillon temporel",
    description: "Terminez tous les niveaux de manière parfaite avec toutes les gemmes.",
    picture: game18.picture,
    release_date: new Date(),
    game_id: game18.id,
    user_id: user2.id,
    username: user2.username
});

const challenge53 = await Challenge.create({
    name: "Maître des pouvoirs",
    description: "Utilisez tous les nouveaux pouvoirs sur chaque niveau avec succès.",
    picture: game18.picture,
    release_date: new Date(),
    game_id: game18.id,
    user_id: user1.id,
    username: user1.username
});

const challenge54 = await Challenge.create({
    name: "Chasseur de reliques",
    description: "Récupérez toutes les reliques et secrets cachés du jeu.",
    picture: game18.picture,
    release_date: new Date(),
    game_id: game18.id,
    user_id: user4.id,
    username: user4.username
});
/*GOAT SIMULATOR 3*/
const challenge55 = await Challenge.create({
    name: "Chaos total",
    description: "Cassez tous les bâtiments et véhicules d’une ville entière.",
    picture: game19.picture,
    release_date: new Date(),
    game_id: game19.id,
    user_id: user3.id,
    username: user3.username
});

const challenge56 = await Challenge.create({
    name: "Goat acrobat",
    description: "Réalisez toutes les cascades et sauts extrêmes du jeu.",
    picture: game19.picture,
    release_date: new Date(),
    game_id: game19.id,
    user_id: user2.id,
    username: user2.username
});

const challenge57 = await Challenge.create({
    name: "Maître du sandbox",
    description: "Explorez tous les coins et interagissez avec tous les objets disponibles.",
    picture: game19.picture,
    release_date: new Date(),
    game_id: game19.id,
    user_id: user1.id,
    username: user1.username
});
/*VALORANT*/
const challenge58 = await Challenge.create({
    name: "Sniper d’élite",
    description: "Obtenez 20 éliminations consécutives avec un fusil de précision.",
    picture: game20.picture,
    release_date: new Date(),
    game_id: game20.id,
    user_id: user4.id,
    username: user4.username
});

const challenge59 = await Challenge.create({
    name: "Maître stratège",
    description: "Gagnez 5 parties consécutives en jouant en équipe.",
    picture: game20.picture,
    release_date: new Date(),
    game_id: game20.id,
    user_id: user1.id,
    username: user1.username
});

const challenge60 = await Challenge.create({
    name: "Agent polyvalent",
    description: "Terminez une partie en utilisant tous les agents au moins une fois.",
    picture: game20.picture,
    release_date: new Date(),
    game_id: game20.id,
    user_id: user3.id,
    username: user3.username
});
/*GRAN TURISMO 7*/
const challenge61 = await Challenge.create({
    name: "Champion de circuit",
    description: "Terminez toutes les courses principales en première position.",
    picture: game21.picture,
    release_date: new Date(),
    game_id: game21.id,
    user_id: user2.id,
    username: user2.username
});

const challenge62 = await Challenge.create({
    name: "Collectionneur de voitures",
    description: "Obtenez toutes les voitures disponibles dans le jeu.",
    picture: game21.picture,
    release_date: new Date(),
    game_id: game21.id,
    user_id: user3.id,
    username: user3.username
});

const challenge63 = await Challenge.create({
    name: "Maître du temps",
    description: "Terminez toutes les courses chronométrées sous le temps imparti.",
    picture: game21.picture,
    release_date: new Date(),
    game_id: game21.id,
    user_id: user1.id,
    username: user1.username
});









// Création des participations
const VideoSubmit1 = await VideoSubmit.create({
    title: "video 1",
    user_id: user1.id,
    challenge_id: challenge1.id,
    url: "https://www.youtube.com/watch?v=EfG2Evfgp2o"
});
const VideoSubmit2 = await VideoSubmit.create({
    title: "video 2",
    user_id: user2.id,
    challenge_id: challenge2.id,
    url: "https://www.youtube.com/watch?v=EfG2Evfgp2o"
});
const VideoSubmit3 = await VideoSubmit.create({
    title: "video 3",
    user_id: user3.id,
    challenge_id: challenge3.id,
    url: "https://www.youtube.com/watch?v=EfG2Evfgp2o"
});


// add vote to challenge
await user2.addVoted_challenges(challenge2);
await user3.addVoted_challenges([challenge2, challenge3]);
await user1.addVoted_challenges([challenge1, challenge2, challenge3]);
await user4.addVoted_challenges(challenge2);


console.log("✅ Insertion des données de seed terminée");
await sequelize.close();