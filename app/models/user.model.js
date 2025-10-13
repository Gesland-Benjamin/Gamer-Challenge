
import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class User extends Model { }

User.init(
  // Definition of model attributes
  // These correspond to the table fields
  {
    username: {
      type: DataTypes.STRING(25), // Limit the username to 25 characters maximum
      allowNull: false, // Set as not nullable
      unique: true, // Prevent the creation of users with the same name.
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    mail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // Prevent the creation of users with the same email.
      validate: {
        isEmail: true, // Validate that the email format is correct
      },
    },

    privacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    role: {
      type: DataTypes.ENUM(["user", "admin"]), // Only "user" and "admin" values will be accepted here
      allowNull: false,
      defaultValue: "user",
    },

    picture: {
      type: DataTypes.STRING(255), // URL or path of the user's avatar
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
    sequelize, // Database connection information
    modelName: "User", // Name of the model
    tableName: "user", // Name of the table in the database
  }
);
