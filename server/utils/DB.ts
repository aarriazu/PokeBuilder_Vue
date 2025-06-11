import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'
//const uri = 'mongodb+srv://pokeadmin:Yg4FDgNGHoNuZ6Ov@pokebuilderdb.1iko4rb.mongodb.net/?retryWrites=true&w=majority&appName=PokeBuilderDB';
const client = new MongoClient(uri);

export async function connectToDatabase() {
  await client.connect();
  console.log('Conectado a MongoDB');
  return client.db('PokeBuilderDB');
}

export async function closeDatabaseConnection() {
  await client.close();
  console.log('Conexión a MongoDB cerrada'); 
}