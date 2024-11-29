import { Usuario } from "../models/usuarios.model.js";
import { Plato } from "../models/platos.model.js";
import { Pedido } from "../models/pedidos.model.js";
import { PlatosPedidos } from "../models/platosypedidos.model.js";
import { sequelize } from "../db.js";

export const modelos = async () => {

  Usuario.hasMany(Pedido);
  Pedido.belongsTo(Usuario);
  Pedido.belongsToMany(Plato, { through: PlatosPedidos });
  Plato.belongsToMany(Pedido, { through: PlatosPedidos});

  await sequelize.sync({ force: true, alter: true });
};