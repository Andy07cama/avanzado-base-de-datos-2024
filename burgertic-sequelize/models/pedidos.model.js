import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { PlatosPedidos } from "./platosypedidos.model.js";
export class Pedido extends Model { }
Pedido.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {sequelize});