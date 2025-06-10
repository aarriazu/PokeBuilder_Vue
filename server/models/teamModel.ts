import { connectToDatabase } from '../utils/DB.js';
import { ObjectId } from 'mongodb';

export async function insertTeam(team: any) {
  const db = await connectToDatabase();
  if (team.ownerId && typeof team.ownerId === 'string') {
    team.ownerId = new ObjectId(team.ownerId);
  }
  return db.collection('teams').insertOne(team);
}

export async function updateTeam(id: string, teamData: any) {
  const db = await connectToDatabase();
  if (teamData.ownerId && typeof teamData.ownerId === 'string') {
    teamData.ownerId = new ObjectId(teamData.ownerId);
  }
  delete teamData._id;
  return db.collection('teams').updateOne({ _id: new ObjectId(id) }, { $set: teamData });
}

export async function getTeamsByOwner(ownerId: string) {
  const db = await connectToDatabase();
  return db.collection('teams')
    .find({ ownerId: new ObjectId(ownerId) })
    .toArray();
}

export async function toggleFavorite(ownerId: string, teamId: string, favorite: boolean) {
  const db = await connectToDatabase();
  return db.collection('teams').updateOne(
    { _id: new ObjectId(teamId), ownerId: new ObjectId(ownerId) },
    { $set: { favorite } }
  );
}

export async function deleteTeam(id: string) {
  const db = await connectToDatabase();
  return db.collection('teams').deleteOne({ _id: new ObjectId(id) });
}
