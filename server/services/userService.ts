import * as UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export async function loginUser(identifier: string, password: string) {
  const user = await UserModel.findUserByUsernameOrEmail(identifier);
  if (!user) throw new Error('User not found');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect password');
  return user;
}

export async function registerUser(data: any) {
  const existingUser = await UserModel.findUserByUsernameOrEmail(data.username);
  if (existingUser) throw new Error('Username or email already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    profilePic: '',
    isMod: false,
    createdAt: new Date(),
    lastLogin: new Date(),
  };
  return UserModel.insertUser(newUser);
}

export async function getUserById(userId: string) {
  const user = await UserModel.getUserById(userId);
  if (!user) throw new Error('User not found');
  return user;
}

export async function updateUser(username: string, data: any) {
  const updates: any = {};
  
  if (data.newUsername) updates.username = data.newUsername;
  if (data.newEmail) updates.email = data.newEmail;
  if (data.newPassword) {
    updates.password = await bcrypt.hash(data.newPassword, 10);
  }
  if (data.newProfilePic) updates.profilePic = data.newProfilePic;
  
  return UserModel.updateUser(username, updates);
}

export async function updateLoginTime(username: string) {
  return UserModel.updateLastLogin(username);
}

export async function getUserProfilePic(username: string) {
  return UserModel.getProfilePic(username);
}
