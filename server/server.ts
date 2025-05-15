import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 3000;

const uri = "mongodb+srv://pokeadmin:Yg4FDgNGHoNuZ6Ov@pokebuilderdb.1iko4rb.mongodb.net/?retryWrites=true&w=majority&appName=PokeBuilderDB";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());

app.post('/api/teams', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("teams");
    const result = await collection.insertOne(req.body);
    res.status(201).send({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error al guardar el equipo:", error);
    res.status(500).send("Error al guardar el equipo");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});