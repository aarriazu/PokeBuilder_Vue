import { connectToDatabase } from '../utils/DB.js';
import { ObjectId } from 'mongodb';

export async function getAllPosts() {
  const db = await connectToDatabase();
  return db.collection('posts').find({}).toArray();
}

export async function getPostById(id: string) {
  const db = await connectToDatabase();
  return db.collection('posts').findOne({ _id: new ObjectId(id) });
}

export async function findPostById(postId: string) {
  const db = await connectToDatabase();
  return db.collection('posts').findOne({ _id: new ObjectId(postId) });
}

export async function insertPost(post: any) {
  const db = await connectToDatabase();
  return db.collection('posts').insertOne(post);
}

export async function updateAnswerCount(postId: string, count: number) {
  const db = await connectToDatabase();
  return db.collection('posts').updateOne(
    { _id: new ObjectId(postId) },
    { $set: { answers: count } }
  );
}

export async function updatePost(id: string, updates: any) {
  const db = await connectToDatabase();
  return db.collection('posts').updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
}

export async function deletePost(id: string) {
  const db = await connectToDatabase();
  return db.collection('posts').deleteOne({ _id: new ObjectId(id) });
}
