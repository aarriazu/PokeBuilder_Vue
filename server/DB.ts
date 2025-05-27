import { MongoClient, ServerApiVersion } from 'mongodb';
import { User } from './server';

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
    return client.db("PokeBuilderDB"); 
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

// Función para insertar un equipo en la colección "teams"
export async function insertTeam(team: any) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("teams"); 
    const result = await collection.insertOne(team);
    console.log("Equipo guardado en la base de datos:", result.insertedId);
    return result.insertedId; 
  } catch (error) {
    console.error("Error al guardar el equipo en la base de datos:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function getUserByUsernameOrEmail(identifier: string): Promise<User | null> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<User>("users"); // Tipar la colección como User

    // Buscar por username o email
    const user = await collection.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (user) {
      return {
        _id: user._id?.toString(),
        username: user.username,
        password: user.password,
        profilePic: user.profilePic,
        email: user.email,
        isMod: user.isMod,
        createdAt: new Date(user.createdAt),
        lastLogin: new Date(user.lastLogin),
      } as User;
    }
    
    return null;
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    throw error;
  } finally {
    await client.close();
  }
}

// Función para insertar un post en la colección "posts"
export async function insertPost(post: any) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("posts"); // Usamos la colección "posts"
    const result = await collection.insertOne(post);
    console.log("Post guardado en la base de datos:", result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error("Error al guardar el post en la base de datos:", error);
    throw error
  }
}

// Función para obtener los datos de un usuario por su ID o nombre de usuario
export async function getUserData(identifier: string) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users"); // Asegúrate de que la colección sea la correcta

    // Buscar por nombre de usuario o email
    const query = typeof identifier === "string" && identifier.includes("@")
      ? { email: identifier }
      : { username: identifier };

    const user = await collection.findOne(query);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    console.log("Usuario encontrado:", user);
    return user;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
}

// Función para insertar un post en la colección "postsTorneo"
export async function insertTorneoPost(post: any) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("postsTorneo"); // Usamos la colección "postsTorneo"
    const result = await collection.insertOne(post);
    console.log("Post de torneo guardado en la base de datos:", result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error("Error al guardar el post de torneo en la base de datos:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export function findPostByName(name: any) {
  throw new Error('Function not implemented.');
}

