const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = process.env.MONGODB;
//const uri = 'mongodb+srv://admin:tpfinal@clustertp.uorvl.mongodb.net/TPfinal?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true});

async function getConnection(){
 //   console.log("URi recuperada de .env:" + uri);
    return await client.connect().catch(err => console.error(err));
}

module.exports = {getConnection};
