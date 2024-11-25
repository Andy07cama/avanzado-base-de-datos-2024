import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PlatosPedidos extends Model {}

PlatosPedidos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);