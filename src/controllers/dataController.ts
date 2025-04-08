import { ref } from 'vue';
import pokemonData from '@/assets/json/pokemonData.json';
import moveData from '@/assets/json/moveData.json';
import typeData from '@/assets/json/typeData.json';
import eggGroupData from '@/assets/json/eggGroupData.json';
import abilityData from '@/assets/json/abilityData.json';

export interface Pokemon {
    id: number;
    name: string;
    sprite: string;
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

//const pokemonDataRef: Pokemon[] = pokemonData;

export interface Item {

}

export interface Move {
    id: number;
    name: string;
    name_es: string;
    type: string;
    category: string;
    power: number;
    accuracy: number;
    pp: number;
    //priority: number;
    effect: string;
    effect_es: string;
}

export interface Type {
    id: number;
    name: string;
    name_es: string;
    //color: string;
    //advantages: string[];
    //disadvantages: string[];
    //immunities: string[];
}

export interface EggGroup {
    id: number;
    name: string;
    name_en: string;
    name_es: string;
}

export function typeTranslate(type: string, lang: string): string | undefined{
  const typeRef = ref(
    typeData.find(p => p.name === type)
   );
  if (lang === 'en'){
    return type.replace('-', ' ');
  }
  else {
    const type_es = typeRef!.value?.name_es;
    return type_es;
  }
}
  
export function moveTranslate(move: string, lang: string): string | undefined{
  const moveRef = ref(
    moveData.find(p => p.name === move)
  );
  if (lang === 'en'){
    return move.replace('-', ' ');
  }
  else {
    const move_es = moveRef!.value?.name_es;
    return move_es;
  }
}
  
export function eggGroupTranslate(eggGroup: string, lang: string): string | undefined{
  const eggGroupRef = ref(
    eggGroupData.find(p => p.name === eggGroup)
  );
  if (lang === 'en'){
    const eggGroup_en = eggGroupRef!.value?.name_en;
    return eggGroup_en;
  }
  else {
    const eggGroup_es = eggGroupRef!.value?.name_es;
    return eggGroup_es;
  }
}

export function abilityTranslate(ability: string, lang: string): string | undefined{
  const abilityRef = ref(
    abilityData.find(p => p.name === ability)
  );
  if (lang === 'en'){
    return ability.replace('-', ' ');
  }
  else {
    const ability_es = abilityRef!.value?.name_es;
    return ability_es;
  }
}