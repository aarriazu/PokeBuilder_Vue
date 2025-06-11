import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectToDatabase, closeDatabaseConnection } from './utils/DB.js'; 
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import torneoPostRoutes from './routes/torneoPostRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Configurar CORS para permitir acceso desde la red local
const corsOptions = {
  origin: [
    'http://localhost:5173',           // Frontend en desarrollo local
    'http://127.0.0.1:5173',
    'http://DESKTOP-6LECRFO:5173',       // Tu IP de red local (cambiar por la tuya)
    'https://DESKTOP-6LECRFO:5173',      // Si usas HTTPS
    'http://desktop-6lecrfo:5173',  
    'https://desktop-6lecrfo:5173',
    //'http://192.168.2.*:5173',         // Permitir cualquier IP en tu subred
  ],
  credentials: true,                   // Permitir cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};




// ✅ Aplicar middleware CORS
app.use(cors(corsOptions));




// ✅ Middleware para headers adicionales (backup)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://DESKTOP-6LECRFO:5173',
    'https://DESKTOP-6LECRFO:5173',
    'http://desktop-6lecrfo:5173',  
    'https://desktop-6lecrfo:5173',
  ];
 
  if (typeof origin ==='string' && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
 
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const SECRET_KEY = 'mi-secreto'; // Cambia esto por una clave segura
//const uri = "mongodb+srv://pokeadmin:Yg4FDgNGHoNuZ6Ov@pokebuilderdb.1iko4rb.mongodb.net/?retryWrites=true&w=majority&appName=PokeBuilderDB";
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Cambiar la ruta para que esté dentro del servidor compilado
    const uploadDir = path.join(__dirname, 'uploads/profile-pics');
    // Crear directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const username = req.body.username || 'user';
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${username}_${timestamp}${extension}`);
  }
});

interface CustomJwtPayload extends JwtPayload {
  username?: string;
  [key: string]: any;
}

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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB límite
  },
  fileFilter: (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

app.post('/api/user/upload-profile-pic', authenticateToken, upload.single('profilePic'), async (req: Request & { user?: CustomJwtPayload }, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    await client.connect();
    const db = client.db("PokeBuilderDB");
    const usersCollection = db.collection('users');

    // Obtener el usuario actual para eliminar la foto anterior
    const currentUser = await usersCollection.findOne({ username });
    if (currentUser?.profilePic && currentUser.profilePic.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, currentUser.profilePic);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Eliminar archivo anterior
      }
    }

    // Actualizar la ruta de la imagen en la base de datos
    const profilePicPath = `/uploads/profile-pics/${req.file.filename}`;
    
    await usersCollection.updateOne(
      { username },
      { $set: { profilePic: profilePicPath } }
    );

    // Generar nuevo token con la imagen actualizada
    const updatedUser = await usersCollection.findOne({ username });
    const token = jwt.sign(
      {
        _id: updatedUser!._id,
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

    res.status(200).json({ 
      message: 'Foto de perfil actualizada correctamente',
      profilePic: profilePicPath,
      token
    });
  } catch (error) {
    console.error('Error al subir foto de perfil:', error);
    res.status(500).json({ error: 'Error al subir la foto de perfil' });
  }
});

// Servir archivos estáticos de las imágenes de perfil
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

connectToDatabase()
  .then(() => {
    console.log('Base de datos conectada correctamente');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Termina el proceso si la conexión falla
  });


// API endpoints
app.use('/api', userRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/postsTorneo', torneoPostRoutes);
app.use('/api/Answers', answerRoutes);
app.use('/api/teams', teamRoutes);


app.get('/', (_req, res) => {
  res.send('PokeBuilder Backend is running!');
});

const httpsOptions = {
  key: fs.readFileSync('./server-key.pem'),      // Ajusta la ruta si es necesario
  cert: fs.readFileSync('./server-cert.pem'),    // Ajusta la ruta si es necesario
};

https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTPS escuchando en https://0.0.0.0:${PORT}`);
});
/*
app.listen(PORT, '0.0.0.0', () => {
     console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
*/