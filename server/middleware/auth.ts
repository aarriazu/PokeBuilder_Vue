import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi-secreto';

export function authenticateToken(req: Request & { user?: any }, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return void res.status(401).send('Token no proporcionado'); // Devuelve void explícitamente
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return void res.status(403).send('Token inválido'); // Devuelve void explícitamente
    }
    req.user = user;
    next();
  });
}
