export interface PokemonInterface {
    id: number;
    name: string;
    sprite: string | null;
    height: number;
    weight: number;
    types: string[];
    abilities: string[];
    eggGroups: string[];
    preEvolution: {
        name: string;
    } | null;
    evolutions: {
        name: string;
    }[];
    generation: number;
    region: string;
    stats: {
        name: string;
        base: number;
    }[];
    moves: string[];
}