import { TeamPokemon } from '@/classes/TeamPokemon';
import { ObjectId } from 'mongodb';

export class Team {
    _id?: string | ObjectId;
    pokemon: TeamPokemon[] //[TeamPokemon, ...TeamPokemon[]] & { length: 0 | 1 | 2 | 3 | 4 | 5 | 6 };
    name: string;
    ownerId: string;
    favorite: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;

    constructor (pokemon: TeamPokemon[], name: string, ownerId: string) {
        this.pokemon = pokemon;
        this.name = name;
        this.ownerId = ownerId;
        this.favorite = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static fromFullData(
        _id: string | ObjectId | undefined,
        pokemon: TeamPokemon[],
        name: string,
        ownerId: string,
        favorite: boolean,
        createdAt: Date,
        updatedAt: Date
    ): Team {
        const team = new Team(pokemon, name, ownerId);
        team._id = _id;
        team.favorite = favorite;
        team.createdAt = createdAt;
        team.updatedAt = updatedAt;
        return team;
    }

    get getPokemon(): TeamPokemon[] {
        return this.pokemon;
    }
    get getName(): string {
        return this.name;
    }
    get getOwner(): string {
        return this.ownerId;
    }
    get getFavorite(): boolean {
        return this.favorite;
    }
    get getCreatedAt(): Date | string {
        return this.createdAt;
    }
    get getUpdatedAt(): Date | string {
        return this.updatedAt;
    }
    
    set setName(name: string) {
        this.name = name;
    }
    set setPokemon(pokemon: TeamPokemon[]) {
        this.pokemon = pokemon;
    }
    set setFavorite(favorite: boolean) {
        this.favorite = favorite;
    }
    set getUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
}