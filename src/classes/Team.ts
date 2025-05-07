import { TeamInterface } from '@/interfaces/teamInterface';
import { TeamPokemon } from '@/classes/TeamPokemon';

export class Team  implements TeamInterface {
    pokemon: TeamPokemon[] //[TeamPokemon, ...TeamPokemon[]] & { length: 0 | 1 | 2 | 3 | 4 | 5 | 6 };
    name: string;
    format: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;

    constructor (pokemon: TeamPokemon[], name: string, format: string, rating: number) {
        this.pokemon = pokemon;
        this.name = name;
        this.format = format;
        this.rating = rating;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    get getPokemon(): TeamPokemon[] {
        return this.pokemon;
    }
    get getName(): string {
        return this.name;
    }
    get getFormat(): string {
        return this.format;
    }
    get getRating(): number {
        return this.rating;
    }
    get getCreatedAt(): Date {
        return this.createdAt;
    }
    get getUpdatedAt(): Date {
        return this.updatedAt;
    }
    
    set setName(name: string) {
        this.name = name;
    }
    set setPokemon(pokemon: TeamPokemon[]) {
        this.pokemon = pokemon;
    }
    
    set setFormat(format: string) {         
        this.format = format;
    }
    
    set setRating(rating: number) {
        this.rating = rating;
    }
    set getUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
}