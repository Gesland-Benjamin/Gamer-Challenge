import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDDexport class Game extends Model {}


export class Participation extends Model {}

Participation.init(

    //Définition des attributs du model 
    // Ils correspondront au champ des tables
    {  
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },

    {
        sequelize, // On indique que les informations de connexion
        modelName: "Participation", // On indique le nom du model
        tableName: "participation" // On indique le nom de la table dans la BDD.
    }
);