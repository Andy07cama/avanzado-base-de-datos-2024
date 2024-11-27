import { Usuario } from "../models/usuarios.model.js";
import { Plato } from "../models/platos.model.js";
import { Pedido } from "../models/pedidos.model.js";
import { PedidosPlatos } from "../models/platosypedidos.model.js";
import { sequelize } from "../db.js";

export const modelos = async () => {

  Usuario.hasMany(Pedido);
  Pedido.belongsTo(Usuario);
  Pedido.belongsToMany(Plato, { through: PedidosPlatos });
  Plato.belongsToMany(Pedido, { through: PedidosPlatos});

  await sequelize.sync({ force: false, alter: false });
};