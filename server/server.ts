import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as dbClass from './DB.js';
import bcrypt from 'bcrypt';


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
  _id?: string;
  username: string;
  password: string;
  profilePic: string;
  email: string;
  isMod: boolean;
  createdAt: Date;
  lastLogin: Date;
}

// Ruta para iniciar sesión y generar un token
app.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por username o email
    const user = await dbClass.getUserByUsernameOrEmail(username);

    if (!user) {
      return res.status(400).send({ error: 'User not found.' });
      //return res.status(401).send({ error: 'User not found.' });
    }

    // Compara la contraseña con el hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: 'Incorrect password.' });
      //return res.status(401).send({ error: 'Incorrect password.' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        createdAt: user.createdAt,
        lastLogin: new Date(),
        isMod: user.isMod,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/api/signin', async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({ error: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Passwords don't match." });
    }

    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection('users');

    // Comprobar si el username ya existe
    const existingUser = await collection.findOne({ username: username });
    if (existingUser) {
      return res.status(400).send({ error: 'This username is already registered.' });
    }

    // Comprobar si el email ya existe
    const existingEmail = await collection.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).send({ error: 'This email is already registered.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      username,
      email,
      password: hashedPassword,
      profilePic: '',
      isMod: false,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    await collection.insertOne(user);
    res.status(201).send({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).send({ error: 'Error al registrar el usuario' });
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

    req.user = user as CustomJwtPayload;
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

//Ruta para recoger usuario
app.post('/api/user', async (req: Request, res: Response): Promise<any> => {
  const request = req.body;
  const username = request.username;
  
  console.log("Username recibido en backend:", username);
  try {
    const user = await dbClass.getUserByUsernameOrEmail(username);

    if (!user) {
      return res.status(401).send('Usuario no encontrado');
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/api/user/update', async (req: Request, res: Response): Promise<any> => {
  const { username, newUsername, newEmail, newPassword, newProfilePic, currentPassword } = req.body;

  try {
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: 'Incorrect current password.' });
    }

    const updateFields: any = {};
    if (newUsername && newUsername !== username) updateFields.username = newUsername;
    if (newEmail && newEmail !== user.email) updateFields.email = newEmail;
    if (newProfilePic) updateFields.profilePic = newProfilePic;
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateFields.password = hashedPassword;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({ error: 'No changes provided.' });
    }

    await usersCollection.updateOne(
  { username },
  { $set: updateFields }
);

  // Obtén los datos actualizados del usuario
  const updatedUser = await usersCollection.findOne({ username: newUsername || username });

  // Genera el nuevo token
  const token = jwt.sign(
    {
      username: updatedUser!.username,
      email: updatedUser!.email,
      profilePic: updatedUser!.profilePic,
      createdAt: updatedUser!.createdAt,
      lastLogin: updatedUser!.lastLogin,
      isMod: updatedUser!.isMod,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.status(200).send({ message: 'User updated successfully.', token });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error.' });
  } finally {
    await client.close();
  }
});

app.put('/api/user/lastLogin', async (req: Request, res: Response): Promise<any> => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const usersCollection = db.collection('users');

    // Actualiza el campo lastLogin con la fecha actual
    const result = await usersCollection.updateOne(
      { username: username },
      { $set: { lastLogin: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('User not found');
    }

    res.send('Last login updated successfully');
  } catch (error) {
    console.error('Error updating lastLogin:', error);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});

// Ruta para obtener todos los Pokémon
app.get('/api/pokemon', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("pokemon");

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

app.get('/api/posts', async (req, res) => {
  try {
    // Conectar a la base de datos
    await client.connect();
    const db = client.db("PokeBuilderDB");
    const collection = db.collection("posts");
    // Obtener todos los posts con subforum "General"
    const posts = await collection.find({ subforum: "General" }).toArray();
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