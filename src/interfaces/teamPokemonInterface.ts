import { Pokemon } from '@/interfaces/pokemonInterface';
import { Item } from '@/interfaces/itemInterface';

export interface TeamPokemon {
    species: Pokemon;
    name: string;
    ability: string;
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
  
export function validatePokemon(teamPokemon: TeamPokemon): boolean {

    const isValidMoves = teamPokemon.moves.every(move => teamPokemon.species.moves.includes(move));

    const isValidIV = teamPokemon.iv.every(stat => stat.amount >= 0 && stat.amount <= 31);
    const isValidEV = teamPokemon.ev.every(stat => stat.amount >= 0 && stat.amount <= 252);
    const totalEVs = teamPokemon.ev.reduce((sum, stat) => sum + stat.amount, 0);
    const isValidTotalEVs = totalEVs <= 510;
  
    return isValidMoves && isValidIV && isValidEV && isValidTotalEVs;
}