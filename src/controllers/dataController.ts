import { ref } from 'vue';
import pokemonData from '@/assets/json/pokemonData.json';
import { Pokemon } from '@/interfaces/pokemonInterface';
import moveData from '@/assets/json/moveData.json';
import { Move } from '@/interfaces/moveInterface';
import typeData from '@/assets/json/typeData.json';
import { Type } from '@/interfaces/typeInterface';
import eggGroupData from '@/assets/json/eggGroupData.json';
import { EggGroup } from '@/interfaces/eggGroupInterface';
import abilityData from '@/assets/json/abilityData.json';
import { Ability } from '@/interfaces/abilityInterface';
//import itemData from '@/assets/json/itemData.json';
import { Item } from '@/interfaces/itemInterface';

export const pokemonArray: Pokemon[] = pokemonData;
export const moveArray: Move[] = moveData;
export const abilityArray: Ability[] = abilityData;
export const typeArray: Type[] = typeData;
export const eggGroupArray: EggGroup[] = eggGroupData;
//export const ItemArray: EggGroup[] = itemData;

export function typeTranslate(type: string, lang: string): string | undefined{
  const typeRef: Type | undefined = typeArray.find(p => p.name === type);
  if (lang === 'en'){
    return type.replace('-', ' ');
  }
  else {
    const type_es = typeRef!.name_es;
    return type_es;
  }
}
  
export function moveTranslate(move: string, lang: string): string | undefined{
  const moveRef: Move | undefined = moveArray.find(p => p.name === move);
  if (lang === 'en'){
    return move.replace('-', ' ');
  }
  else {
    const move_es = moveRef!.name_es;
    return move_es;
  }
}
  
export function eggGroupTranslate(eggGroup: string, lang: string): string | undefined{
  const eggGroupRef: EggGroup | undefined = eggGroupArray.find(p => p.name === eggGroup);
  if (lang === 'en'){
    const eggGroup_en = eggGroupRef!.name_en;
    return eggGroup_en;
  }
  else {
    const eggGroup_es = eggGroupRef!.name_es;
    return eggGroup_es;
  }
}

export function abilityTranslate(ability: string, lang: string): string | undefined{
  const abilityRef: Ability | undefined = abilityData.find(p => p.name === ability);
  if (lang === 'en'){
    return ability.replace('-', ' ');
  }
  else {
    const ability_es = abilityRef!.name_es;
    return ability_es;
  }
}