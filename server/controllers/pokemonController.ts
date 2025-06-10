import { Request, Response } from 'express';
import * as PokemonService from '../services/pokemonService.js';

export async function getAllPokemon(req: Request, res: Response) {
  try {
    const pokemonList = await PokemonService.listAllPokemon();
    res.status(200).json(pokemonList);
  } catch (error: any) {
    console.error("Error al obtener los Pokémon:", error);
    res.status(500).json({ error: "Error al obtener los Pokémon" });
  }
}

export async function getPokemonByIdOrName(req: Request, res: Response) {
  try {
    const { identifier } = req.params;
    const pokemon = await PokemonService.getPokemon(identifier);
    if (!pokemon) {
      res.status(404).json({ error: "Pokémon no encontrado" });
    } else {
      res.status(200).json(pokemon);
    }
  } catch (error: any) {
    console.error("Error al obtener el Pokémon:", error);
    res.status(500).json({ error: "Error al obtener el Pokémon" });
  }
}
