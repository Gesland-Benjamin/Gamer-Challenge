import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class Game extends Model {}

Game.init(

    //Définition des attributs du model 
    // Ils correspondront au champ des tables
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // On empêche la création de jeux ayant le même nom.
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
        sequelize, // On indique que les informations de connexion
        modelName: "Game", // On indique le nom du model
        tableName: "game" // On indique le nom de la table dans la BDD.
    }
);