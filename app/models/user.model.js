import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class User extends Model { }

User.init(
  //Définition des attributs du model
  // Ils correspondront au champ des tables
  {
    username: {
      type: DataTypes.STRING(25), // On limite le nom d'utilisateur à 50 caractères maximals
      allowNull: false, // On le définit comme non nullable
      unique: true, // On empêche la création d'utilisateur ayant le même nom.
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    mail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // On empêche la création d'utilisateur ayant le même mail.
      validate: {
        isEmail: true, // On vérifie que le format de l'email est correct
      },
    },

    privacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    role: {
      type: DataTypes.ENUM(["user", "admin"]), // seules les valeurs "user" et "admin" seront acceptées ici
      allowNull: false,
      defaultValue: "user",
    },

    picture: {
      type: DataTypes.STRING(255), // URL ou chemin de l'avatar de l'utilisateur
      allowNull: true,

    },

    favoriteGame: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },

    youtube_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    twitch_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    discord_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize, // On indique que les informations de connexion
    modelName: "User", // On indique le nom du model
    tableName: "user", // On indique le nom de la table dans la BDD.
  }
);
