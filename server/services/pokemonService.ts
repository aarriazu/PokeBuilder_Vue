import { getAllPokemon, getPokemonByIdentifier } from '../models/pokemonModel.js';

export async function listAllPokemon() {
  return getAllPokemon(); 
}

export async function getPokemon(identifier: string) {
  return getPokemonByIdentifier(identifier); 
}
