// This file defines the VideoSubmit model using the Sequelize ORM.

import { DataTypes, Model } from "sequelize"; // Required to create models
import { sequelize } from "./sequelize.client.js"; // Database connection

export class VideoSubmit extends Model {}

VideoSubmit.init(
    // Definition of model attributes
    // These correspond to the table fields
    {  
        title: {
            type: DataTypes.STRING(100), // Title of the video, max 100 characters
            allowNull: false, // Cannot be null
        },

        url: {
            type: DataTypes.STRING(255), // URL of the video, max 255 characters
            allowNull: false, // Cannot be null
        }
    },

    {
        sequelize, // Database connection information
        modelName: "VideoSubmit", // Name of the model
        tableName: "videosubmit" // Name of the table in the database
    }
);