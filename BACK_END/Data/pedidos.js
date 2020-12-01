const { ObjectID } = require('mongodb');
const connection = require('./connection');

const nombreBase = 'TPfinal';
const nombreCollection = 'pedidos';


async function getAllpedidos() {
    const mongo = await connection.getConnection();
    return await mongo.db(nombreBase)
         .collection(nombreCollection)
         .find()
         .toArray()
};

async function getPedido(id) {
    const mongo = await connection.getConnection();
    return await mongo.db(nombreBase)
         .collection(nombreCollection)
         .findOne({_id: ObjectID(id)})
};

async function addPedido(pedido) {
    const mongo = await connection.getConnection();
    await mongo.db(nombreBase)
        .collection(nombreCollection)
        .insertOne(pedido)
};

async function deletePedido(id) {
    const mongo = await connection.getConnection();
    await mongo.db(nombreBase)
        .collection(nombreCollection)
        .deleteOne({_id: ObjectID(id)})
};

async function editPedido(pedido) {
    const newValues = {
        $set: {
            emailUser: pedido.emailUser,
            importe: pedido.importe,
            fecha: pedido.fecha,
            terminado: pedido.terminado,
            productos: pedido.productos
        }
    }
    const mongo = await connection.getConnection();
    await mongo.db(nombreBase)
        .collection(nombreCollection)
        .updateOne({_id: ObjectID(pedido._id)}, newValues)
};

module.exports = { getAllpedidos, getPedido, addPedido, deletePedido, editPedido};

