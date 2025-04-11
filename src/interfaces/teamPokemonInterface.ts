import { Pokemon } from '@/interfaces/pokemonInterface';
import { Item } from '@/interfaces/itemInterface';

export interface TeamPokemonInterface {
    species: Pokemon;
    name: string;
    ability: string;
    nature: string;
    item: Item;
    iv: {
      name: string;
      amount: number;
    }[];
    ev: {
      name: string;
      amount: number;
    }[];
    moves: string[];
}