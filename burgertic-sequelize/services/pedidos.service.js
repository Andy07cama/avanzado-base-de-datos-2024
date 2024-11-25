import { Pedido } from "../models/pedidos.model.js";
import { PlatosPedidos } from "../models/platosypedidos.model.js"; 

const getPlatosByPedido = async (idPedido) => {
  const pedido = await Pedido.findByPk(idPedido);
  if (!pedido) throw new Error("No se hallo un pedido");

  const platosPedidos = await PlatosPedidos.findAll({ 
    where: { PedidoId: idPedido },
  });
  const resultado = [];
  platosPedidos.forEach((row) => { 
    resultado.push({
      id: row.PlatoId,
      cantidad: row.cantidad,
    });
  });

  return resultado;
};

const getPedidos = async () => {
  const pedidos = await Pedido.findAll();

  const array = [];
  for (const pedido of pedidos) {
    array.push({
      id: pedido.id,
      idUsuario: pedido.UsuarioId,
      fecha: pedido.fecha,
      estado: pedido.estado,
      platos: await getPlatosByPedido(pedido.id),
    });
  }

  return array;
};

const getPedidoById = async (id) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new Error("No se hallo un pedido");
  return {
    id: pedido.id,
    idUsuario: pedido.UsuarioId,
    fecha: pedido.fecha,
    estado: pedido.estado,
    platos: await getPlatosByPedido(pedido.id),
  };
};

const getPedidosByUser = async (idUsuario) => {
  const pedido = await Pedido.findOne({ where: { UsuarioId: idUsuario } });
  if (!pedido) throw new Error("No se hallo un pedido");
  return {
    id: pedido.id,
    idUsuario: pedido.UsuarioId,
    fecha: pedido.fecha,
    estado: pedido.estado,
    platos: await getPlatosByPedido(pedido.id),
  };
};

const createPedido = async (idUsuario, platos) => {
  const pedido = await Pedido.create({
    UsuarioId: idUsuario,
    fecha: new Date(),
    estado: "pendiente",
  });

  const platosData = platos.map((plato) => ({
    idPedido: pedido.id,
    idPlato: plato.id,
    cantidad: plato.cantidad,
  }));

  await PlatosPedidos.bulkCreate(platosData); 

  return pedido;
};

const updatePedido = async (id, estado) => {
  const pedido = await Pedido.findByPk(id);

  if (!pedido) throw new Error("No se encontro el pedido");

  pedido.estado = estado;
  await pedido.save();

  return pedido;
};

const deletePedido = async (id) => {
  const pedido = await Pedido.findByPk(id);

  if (!pedido) throw new Error("No se encontraron pedidos");

  await pedido.destroy();
};

export default {
  getPedidos,
  getPedidoById,
  getPedidosByUser,
  createPedido,
  updatePedido,
  deletePedido,
};
