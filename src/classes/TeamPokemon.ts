import { PokemonInterface } from '@/interfaces/pokemonInterface';

export class TeamPokemon {
  species: PokemonInterface;
  name: string;
  ability: string;
  nature: string;
  item: string;
  iv: { name: string; amount: number }[];
  ev: { name: string; amount: number }[];
  evTotal: number;
  moves: string[];

  constructor();
  constructor(species: PokemonInterface);
  constructor(
    species: PokemonInterface,
    name: string,
    ability: string,
    nature: string,
    item: string,
    iv: { name: string; amount: number }[],
    ev: { name: string; amount: number }[],
    evTotal: number,
    moves: string[]
  );

  // Implementación del constructor
  constructor(
    species?: PokemonInterface,
    name?: string,
    ability?: string,
    nature?: string,
    item?: string,
    iv?: { name: string; amount: number }[],
    ev?: { name: string; amount: number }[],
    evTotal?: number,
    moves?: string[]
  ) {
    this.species = species || { 
      id: 0, 
      name: '', 
      sprite: '', 
      height: 0, 
      weight: 0, 
      types: [], 
      abilities: [], 
      eggGroups: [],
      preEvolution: null,
      evolutions: [],
      generation: 0,
      region: '',
      stats: [],
      moves: [], 
      
    };
    this.name = name || (species ? species.name : ''); 
    this.ability = ability || '';
    this.nature = nature || '';
    this.item = item || '';
    this.iv = iv || [
      { name: 'hp', amount: 0 },
      { name: 'attack', amount: 0 },
      { name: 'defense', amount: 0 },
      { name: 'special-attack', amount: 0 },
      { name: 'special-defense', amount: 0 },
      { name: 'speed', amount: 0 },
    ];
    this.ev = ev || [
      { name: 'hp', amount: 0 },
      { name: 'attack', amount: 0 },
      { name: 'defense', amount: 0 },
      { name: 'special-attack', amount: 0 },
      { name: 'special-defense', amount: 0 },
      { name: 'speed', amount: 0 },
    ];
    this.evTotal = evTotal || 0;
    this.moves = moves || ['', '', '', '']; 
  }

  // Getter y Setter para species
  get getSpecies(): PokemonInterface {
    return this.species;
  }

  set setSpecies(species: PokemonInterface) {
    this.species = species;
  }

  // Getter y Setter para name
  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  // Getter y Setter para ability
  get getAbility(): string {
    return this.ability;
  }

  set setAbility(ability: string) {
    this.ability = ability;
  }

  // Getter y Setter para nature
  get getNature(): string {
    return this.nature;
  }

  set setNature(nature: string) {
    this.nature = nature;
  }

  // Getter y Setter para item
  get getItem(): string {
    return this.item;
  }

  set setItem(item: string) {
    this.item = item;
  }

  // Getter y Setter para iv
  get getIV(): { name: string; amount: number }[] {
    return this.iv;
  }

  set setIV(iv: { name: string; amount: number }[]) {
    this.iv = iv;
  }

  // Getter y Setter para ev
  get getEV(): { name: string; amount: number }[] {
    return this.ev;
  }

  set setEV(ev: { name: string; amount: number }[]) {
    this.ev = ev;
  }

  // Getter y Setter para ev_total
  get getEVTotal(): number {
    return this.evTotal;
  }

  set setEVTotal(evTotal: number) {
    this.evTotal = evTotal;
  }

  // Getter y Setter para moves
  get getMoves(): string[] {
    return this.moves;
  }

  set setMoves(moves: string[]) {
    this.moves = moves;
  }
}

export function validatePokemon(teamPokemon: TeamPokemon): boolean {

    const isValidMoves = teamPokemon.moves.every(move => teamPokemon.species.moves.includes(move));

    const isValidIV = teamPokemon.iv.every(stat => stat.amount >= 0 && stat.amount <= 31);
    const isValidEV = teamPokemon.ev.every(stat => stat.amount >= 0 && stat.amount <= 252);
    const totalEVs = teamPokemon.ev.reduce((sum, stat) => sum + stat.amount, 0);
    const isValidTotalEVs = totalEVs <= 510;
  
    return isValidMoves && isValidIV && isValidEV && isValidTotalEVs;
}