const jsonWebToken = require('jsonwebtoken');
const users = require('../Data/users');
require('dotenv').config();

async function auth(req,res,next) {
   try {
      const token = req.header('Authorization').replace('Bearer ', '');
      console.log(token);
      const user = jsonWebToken.verify(token, process.env.SECRET);
      console.log(JSON.stringify(user));
      next(); 
   } catch (error) {
       res.status(401).send('Error de autenticacion');
   }
}

module.exports = auth;