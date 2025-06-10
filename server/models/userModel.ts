import { connectToDatabase } from '../utils/DB.js';
import { ObjectId } from 'mongodb';

export async function findUserByUsernameOrEmail(identifier: string) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return collection.findOne(
    { $or: [{ username: identifier }, { email: identifier }] },
    { projection: { _id: 1, username: 1, email: 1, password: 1, profilePic: 1, isMod: 1, createdAt: 1 } }
  );
}


export async function insertUser(user: any) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return collection.insertOne(user);
}

export async function updateUser(username: string, updates: any) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return collection.updateOne({ username }, { $set: updates });
}

export async function updateLastLogin(username: string) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return collection.updateOne({ username }, { $set: { lastLogin: new Date() } });
}

export async function getProfilePic(username: string) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  const user = await collection.findOne({ username });
  return user?.profilePic || null;
}
export async function getUserById(userId: string) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return collection.findOne({ _id: new ObjectId(userId) });
}
