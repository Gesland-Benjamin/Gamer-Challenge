import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class Challenge extends Model {}

Challenge.init(

    //Définition des attributs du model 
    // Ils correspondront au champ des tables
    {
        name: {
            type : DataTypes.STRING(100), // On limite le nom du challenge à 50 caractères maximals
            allowNull: false,   // On le définit comme non nullable
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        release_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    
    {
        sequelize, // On indique que les informations de connexion
        modelName: "Challenge", // On indique le nom du model
        tableName: "challenge" // On indique le nom de la table dans la BDD.
    }
);