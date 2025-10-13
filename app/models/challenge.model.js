

import { DataTypes, Model } from "sequelize"; // Required to create models
import { sequelize } from "./sequelize.client.js"; // Corresponds to the database connection

export class Challenge extends Model {}

Challenge.init(
    // Definition of model attributes
    // These correspond to the table fields
    {
        name: {
            type : DataTypes.STRING(100), // Limit the challenge name to 100 characters maximum
            allowNull: false,   // Set as not nullable
        },

        description: {
            type: DataTypes.TEXT, // Challenge description
            allowNull: false,
        },

        release_date: {
            type: DataTypes.DATE, // Release date of the challenge
            allowNull: false,
        }
    },
    
    {
        sequelize, // Database connection information
        modelName: "Challenge", // Name of the model
        tableName: "challenge" // Name of the table in the database
    }
);