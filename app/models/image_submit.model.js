import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export const ImageSubmit = sequelize.define(
  "ImageSubmit",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    }
  },
  {
    sequelize,          
    tableName: "image_submits",
    modelName: "ImageSubmit"
  }
);