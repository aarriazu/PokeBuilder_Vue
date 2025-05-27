import { TeamPokemon } from '@/classes/TeamPokemon';
import { ObjectId } from 'mongodb';

export interface TeamInterface {
    _id?: ObjectId | string;
    pokemon: TeamPokemon[] //[TeamPokemon, ...TeamPokemon[]] & { length: 0 | 1 | 2 | 3 | 4 | 5 | 6 };
    name: string;
    ownerId: string;
    favorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}