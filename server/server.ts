import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import * as db from './DB.js';
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

app.use(cors());
app.use(express.json());

// Ruta para obtener todos los Pokémon
app.get('/api/pokemon', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("pokemon");

    // Obtener todos los Pokémon con los campos necesarios
    const pokemonList = await collection
      .find({}, { projection: { id: 1, name: 1, sprite: 1, types: 1, generation: 1 } }) // Seleccionar los campos necesarios
      .toArray();

    res.status(200).send(pokemonList);
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    res.status(500).send({ error: "Error al obtener los Pokémon" });
  } finally {
    await client.close();
  }
});

// Ruta para obtener un Pokémon por ID o nombre
app.get('/api/pokemon/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier; // Puede ser un ID o un nombre
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("pokemon");

    // Busca por ID (número) o nombre (cadena)
    const query = isNaN(Number(identifier))
      ? { name: identifier.toLowerCase() }
      : { id: Number(identifier) };

    const pokemon = await collection.findOne(query);

    if (!pokemon) {
      res.status(404).send({ error: "Pokémon no encontrado" });
    } else {
      res.status(200).send(pokemon);
    }
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    res.status(500).send({ error: "Error al obtener el Pokémon" });
  } finally {
    await client.close();
  }
});

//Recibir llamada para insertar equipo en la base de datos
app.post('/api/teams', async (req, res) => {
  try {
    const team = req.body; 
    const insertedId = await db.insertTeam(team);
    res.status(201).send({ insertedId });
  } catch (error) {
    console.error("Error al guardar el equipo:", error);
    res.status(500).send("Error al guardar el equipo");
  }
});

// Ruta para buscar un post por nombre
app.get('/api/posts/:name', async (req, res) => {  
  try {
    const name = req.params.name; 
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("posts");

    // Buscar el post por nombre
    const post = await collection.findOne({ name: name.toLowerCase() });

    if (!post) {
      res.status(404).send({ error: "Post no encontrado" });
    } else {
      res.status(200).send(post);
    }
  } catch (error) {
    console.error("Error al obtener el post:", error);
    res.status(500).send({ error: "Error al obtener el post" });
  } finally {
    await client.close();
  }
});

// Recibir llamada para insertar un post en la base de datos (RECORDAR LA PRMOMISE <ANY>)
app.post('/api/posts', async (req, res): Promise <any> => {
  try {
    const post = req.body;
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("posts");

    // Validar que no haya un post con el mismo nombre de torneo
    const existingPost = await collection.findOne({ name: post.name.toLowerCase() });
    if (existingPost) {
      return res.status(400).send({ error: "Ya existe un torneo con este nombre." });
    }

    // Insertar el nuevo post
    const result = await collection.insertOne(post);
    res.status(201).send({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error al guardar el post:", error);
    res.status(500).send("Error al guardar el post");
  } finally {
    await client.close();
  }
});

app.post('/api/postsTorneo', async (req,res): Promise<any> => {
  try {
    console.log("Datos recibidos:", req.body);
    const post = req.body;

    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("postsTorneo");

    // Validar que no haya un post con el mismo nombre
    const existingPost = await collection.findOne({ name: post.title.toLowerCase() });
    if (existingPost) {
      return res.status(400).json({ error: "Ya existe un torneo con este nombre." });
    }

    // Insertar el nuevo post
    const insertedId = await insertTorneoPost(post);
    res.status(201).json({ insertedId }); // Respuesta JSON válida
  } catch (error) {
    console.error("Error al guardar el post:", error);
    res.status(500).json({ error: "Error al guardar el post" }); // Respuesta JSON válida en caso de error
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});