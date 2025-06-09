import { connectToDatabase } from '../utils/DB.js';
import { ObjectId } from 'mongodb';

export async function getAllTorneoPosts() {
  const db = await connectToDatabase();
  return db.collection('postsTorneo').find({}).toArray();
}

export async function getTorneoPostById(id: string) {
  const db = await connectToDatabase();
  return db.collection('postsTorneo').findOne({ _id: new ObjectId(id) });
}

export async function insertTorneoPost(post: any) {
  const db = await connectToDatabase();
  return db.collection('postsTorneo').insertOne(post);
}

export async function updateTorneoPost(id: string, updates: any) {
  const db = await connectToDatabase();
  return db.collection('postsTorneo').updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
}

export async function updateTorneoAnswers(id: string, answers: any) {
  const db = await connectToDatabase();
  return db.collection('postsTorneo').updateOne(
    { _id: new ObjectId(id) },
    { $set: { answers } }
  );
}

export const updateAnswersCountById = async (id: string, answers: number) => {
  const db = await connectToDatabase();
  const collection = db.collection('postsTorneo');

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { answers } }
  );

  return result.modifiedCount > 0;
};

export async function deleteTorneoPost(id: string) {
  const db = await connectToDatabase();
  return db.collection('postsTorneo').deleteOne({ _id: new ObjectId(id) });
}
