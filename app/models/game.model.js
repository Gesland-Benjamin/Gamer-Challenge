

import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class Game extends Model {}

Game.init(

    // Definition of model attributes
    // These correspond to the table fields
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // Prevent the creation of games with the same name.
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        release_year: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        genre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        picture: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize, // Database connection information
        modelName: "Game", // Name of the model
        tableName: "game" // Name of the table in the database
    }
);