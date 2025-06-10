import { connectToDatabase } from '../utils/DB.js';
import { ObjectId } from 'mongodb';

export async function insertAnswer(answer: any) {
  const db = await connectToDatabase();
  if (answer.postId && typeof answer.postId === 'string') {
    answer.postId = new ObjectId(answer.postId);
  }
  return db.collection('Answers').insertOne(answer);
}

export async function getAnswersByPost(postId?: string) {
  const db = await connectToDatabase();
  const filter = postId ? { postId: new ObjectId(postId) } : {};
  return db.collection('Answers').find(filter).toArray();
}

export async function updateAnswer(id: string, content: string, editedAt: string) {
  const db = await connectToDatabase();
  return db.collection('Answers').updateOne(
    { _id: new ObjectId(id) },
    { $set: { content, editedAt } }
  );
}

export async function deleteAnswer(id: string) {
  const db = await connectToDatabase();
  return db.collection('Answers').deleteOne({ _id: new ObjectId(id) });
}

export async function findAnswerById(id: string) {
  const db = await connectToDatabase();
  return db.collection('Answers').findOne({ _id: new ObjectId(id) });
}
