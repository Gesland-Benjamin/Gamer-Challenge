import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class Challenge extends Model {}

User.init(

    //Définition des attributs du model 
    // Ils correspondront au champ des tables
    {
        username: {
            type : DataTypes.STRING(50), // On limite le nom d'utilisateur à 50 caractères maximals
            allowNull: false,   // On le définit comme non nullable
            unique: true, // On empêche la création d'utilisateur ayant le même nom.
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true, // On empêche la création d'utilisateur ayant le même mail.
            validate: {
                isEmail: true, // On vérifie que le format de l'email est correct
            }
        },
    },
    {
        sequelize, // On indique que les informations de connexion
        modelName: "Challenge", // On indique le nom du model
        tableName: "challenge" // On indique le nom de la table dans la BDD.
    }
);