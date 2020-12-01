const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const conectionMongo = require('./connection');
require('dotenv').config();

const nombreBase = 'TPfinal';
const nombreCollection = 'users';

async function login(email, password) {
    const mongo = await conectionMongo.getConnection();
    const user = await mongo.db(nombreBase)
        .collection(nombreCollection)
        .findOne({email: email});
    if (!user){
        throw new Error ('No se puede encuentra el usuario')
    }
    const estaOk = await bcrypt.compare(password , user.password)
    if (!estaOk){
        throw new Error ('contraseña incorrecta')
    }
    return user
};

async function createAccount (user) {
    const mongo = await conectionMongo.getConnection();
    user.password = await bcrypt.hash(user.password , 8);
    return await mongo.db(nombreBase)
      .collection(nombreCollection)
      .insertOne(user);
};

async function generateToken(user) {
    const token = jsonWebToken.sign({_id: user._id.toString()},process.env.SECRET, {expiresIn : '1h'});
    console.log(token);
    return token;
};


async function getAllUsers(){
    const mongo = await conectionMongo.getConnection();
    return await mongo.db(nombreBase)
        .collection(nombreCollection)
        .find()
        .toArray()  
}


async function getUser(email){
    const mongo = await conectionMongo.getConnection();
    return await mongo.db(nombreBase)
        .collection(nombreCollection)
        .findOne({email: email})        
}


async function updateUser(user){
    const newValues = {
        $set: {
            name: user.name,
            email: user.email,
            password: user.password,
            pedidos: user.pedidos,
            esAdmin: user.esAdmin
        }
    } 
    const mongo = await conectionMongo.getConnection();
    
    await mongo.db(nombreBase)
    .collection(nombreCollection)
    .updateOne({_id: ObjectID(user._id)}, newValues)
}

module.exports = {login, createAccount, generateToken, getAllUsers, getUser, updateUser};