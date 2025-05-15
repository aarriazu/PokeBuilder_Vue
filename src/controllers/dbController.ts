import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://pokeadmin:Yg4FDgNGHoNuZ6Ov@pokebuilderdb.1iko4rb.mongodb.net/?retryWrites=true&w=majority&appName=PokeBuilderDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB Atlas");
    return client.db("PokeBuilderDB"); // Nombre de la base de datos
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

// Función para insertar un equipo en la colección "teams"
async function insertTeam(team: any) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("teams"); // Nombre de la colección
    const result = await collection.insertOne(team);
    console.log("Equipo guardado en la base de datos:", result.insertedId);
    return result.insertedId; // Devuelve el ID del equipo insertado
  } catch (error) {
    console.error("Error al guardar el equipo en la base de datos:", error);
    throw error;
  } finally {
    await client.close(); // Cierra la conexión después de la operación
  }
}

export { insertTeam };