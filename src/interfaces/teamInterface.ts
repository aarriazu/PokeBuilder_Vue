import { TeamPokemon } from '@/classes/TeamPokemon';

export interface Team {
    pokemon: [TeamPokemon, ...TeamPokemon[]] & { length: 0 | 1 | 2 | 3 | 4 | 5 | 6 };
    team: Team;
    name: string;
    format: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}