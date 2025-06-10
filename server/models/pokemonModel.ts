import { connectToDatabase } from '../utils/DB.js';


export {}; 

export async function getAllPokemon() {
  const db = await connectToDatabase();
  return db.collection('pokemon')
    .find({}, {
      projection: {
        id: 1,
        name: 1,
        sprite: 1,
        types: 1,
        generation: 1,
      }
    })
    .toArray();
}

export async function getPokemonByIdentifier(identifier: string) {
  const db = await connectToDatabase();
  const query = isNaN(Number(identifier))
    ? { name: identifier.toLowerCase() }
    : { id: Number(identifier) };

  return db.collection('pokemon').findOne(query);
}