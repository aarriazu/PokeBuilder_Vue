import { Request, Response } from 'express';
import * as UserService from '../services/userService.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi-secreto';

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await UserService.loginUser(username, password);
    const token = jwt.sign({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      lastLogin: new Date(),
      isMod: user.isMod,
    }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new Error("Passwords don't match");

    await UserService.registerUser({ username, email, password });
    res.status(201).json({ message: 'User succesfully created' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const { username, ...updates } = req.body;
    await UserService.updateUser(username, updates);
    res.status(200).json({ message: 'Profile updated' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function lastLogin(req: Request, res: Response) {
  try {
    const { username } = req.body;
    await UserService.updateLoginTime(username);
    res.status(200).send('Last login updated successfully');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProfilePic(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const profilePic = await UserService.getUserProfilePic(username);
    res.status(200).json({ profilePic });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener la imagen de perfil' });
  }
}
