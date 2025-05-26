import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as dbClass from './DB.js';
const app = express();
const port = 3000;

const sessionUser: string =  "admin";
const sessionPass: string =  "admin";

const SECRET_KEY = 'mi-secreto'; // Cambia esto por una clave segura
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


// Interfaz para el payload del token
interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

// Interfaz para el usuario
export interface User {
  id: number;
  username: string;
  password: string;
  profilePicture: string;
  email: string;
  isMod: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Ruta para iniciar sesión y generar un token
app.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por username o email
    const user = await dbClass.getUserByUsernameOrEmail(username);

    if (!user) {
      return res.status(401).send('Usuario no encontrado');
    }

    // Verificar la contraseña
    if (password !== user.password) {
      return res.status(401).send('Contraseña incorrecta');
    }
    /*
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Contraseña incorrecta');
    }
    */

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send('Error interno del servidor');
  }
});

// Middleware para verificar el token
function authenticateToken(req: Request & { user?: CustomJwtPayload }, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).send('Token no proporcionado');
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).send('Token inválido');
      return;
    }

    req.user = user as CustomJwtPayload; // Aseguramos que el payload cumple con la interfaz CustomJwtPayload
    next();
  });
}

// Ruta protegida
app.get('/profile', authenticateToken, (req: Request & { user?: CustomJwtPayload }, res: Response) => {
  if (req.user) {
    res.send(`Bienvenido, ${req.user.username}`);
  } else {
    res.status(401).send('No autorizado');
  }
});

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
app.post('/api/teams', async (req: Request, res: Response) => {
  try {
    const team = req.body; 
    const insertedId = await dbClass.insertTeam(team);
    res.status(201).send({ insertedId });
  } catch (error) {
    console.error("Error al guardar el equipo:", error);
    res.status(500).send("Error al guardar el equipo");
  }
});

// Ruta para buscar un post por nombre
app.get('/api/posts/:id', async (req, res): Promise <any> => {  
  try {
    const id = req.params.id;
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("posts");
    // Buscar el post por _id
    let post;
    try {
      post = await collection.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      return res.status(400).send({ error: "ID de post no válido" });
    }
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

app.get('/api/posts', async (req, res) => {
  try {
    // Conectar a la base de datos
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("posts");
    // Obtener todos los posts 
    const posts = await collection.find({}).toArray();
    // Enviar los posts como respuesta
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ error: "Error al obtener los posts" });
  } finally {
    // Cerrar la conexión con la base de datos
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

    // Validar que el título exista
    if (!post.title) {
      return res.status(400).send({ error: "El título es obligatorio." });
    }

    // Validar que no haya un post con el mismo título
    const existingPost = await collection.findOne({ title: post.title.toLowerCase() });
    if (existingPost) {
      return res.status(400).send({ error: "Ya existe un post con este título." });
    }

    // Insertar el nuevo post
    const insertedId = await dbClass.insertPost(post);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.error("Error al guardar el post:", error);
    res.status(500).send("Error al guardar el post");
  } finally {
    await client.close();
  }
});

app.get('/api/postsTorneo', async (req, res): Promise<any> => {
  try {
    // Conectar a la base de datos
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("postsTorneo");

    // Obtener todos los posts de subforo de torneos
    const postsTorneo = await collection.find({}).toArray();

    // Enviar los posts como respuesta
    res.status(200).json(postsTorneo);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ error: "Error al obtener los posts" });
  } finally {
    // Cerrar la conexión con la base de datos
    await client.close();
  }
});


app.post('/api/postsTorneo', async (req,res): Promise<any> => {
  try {
    console.log("Datos recibidos:", req.body);
    const post = req.body;

    // Insertar el nuevo post de torneo
    const insertedId = await dbClass.insertTorneoPost(post);
    res.status(201).json({ insertedId }); // Respuesta JSON válida
  } catch (error) {
    console.error("Error al guardar el post:", error);
    res.status(500).json({ error: "Error al guardar el post" }); // Respuesta JSON válida en caso de error
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});