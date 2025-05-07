import { TeamPokemon } from '@/classes/TeamPokemon';

export interface TeamInterface {
    pokemon: TeamPokemon[] //[TeamPokemon, ...TeamPokemon[]] & { length: 0 | 1 | 2 | 3 | 4 | 5 | 6 };
    name: string;
    format: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}