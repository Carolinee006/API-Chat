const {MongoClient, Collection} = require("mongodb");
const { listarSalas } = require("./salaModel");
const { registrarUsuario } = require("./usuarioModel");
const { checktoken, setToken } = require("../../util/token");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE
    );
    return singleton;
}

let findAll = async (Collection)=>{
    const db = await connect();
    return await db.Collection(Collection).find().toArray();
}

let findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    if(obj)
        return obj[0];
    return false;
}

let updateOne = async (collection, object, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: object});
    return result;
}

module.exports={findAll, insertOne, registrarUsuario, listarSalas, checktoken, setToken};