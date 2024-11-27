import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { PlatosPedidos } from "./platos.pedidos.model.js"; 

export const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Pedido.hasMany(PlatosPedidos); 
PlatosPedidos.belongsTo(Pedido); 
