import { ref } from 'vue';
//import pokemonData from '@/assets/json/pokemonData.json';
import { PokemonInterface } from '@/interfaces/pokemonInterface';
import moveData from '@/assets/json/moveData.json';
import { Move } from '@/interfaces/moveInterface';
import typeData from '@/assets/json/typeData.json';
import { Type } from '@/interfaces/typeInterface';
import eggGroupData from '@/assets/json/eggGroupData.json';
import { EggGroup } from '@/interfaces/eggGroupInterface';
import abilityData from '@/assets/json/abilityData.json';
import { Ability } from '@/interfaces/abilityInterface';
import natureData from '@/assets/json/natureData.json';
import { Nature } from '@/interfaces/natureInterface';
//import itemData from '@/assets/json/itemData.json';
import { Item } from '@/interfaces/itemInterface';

import axios from 'axios';


//export const pokemonArray: PokemonInterface[] = pokemonData;
export const moveArray: Move[] = moveData;
export const abilityArray: Ability[] = abilityData;
export const typeArray: Type[] = typeData;
export const eggGroupArray: EggGroup[] = eggGroupData;
export const natureArray: Nature[] = natureData;
//export const ItemArray: Item[] = itemData;

const API_BASE_URL = 'http://localhost:3000/api';

export async function getPokemon(identifier: string | number) {
  console.log("Intentando obtener pokemon:", identifier);
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${identifier}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    throw new Error("No se pudo obtener el Pokémon");
  }
}

export async function getAllPokemon() {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    throw error;
  }
}

export async function getPosts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw error;
  }
}

export async function getPostsTorneo() {
  try {
    const response = await axios.get(`${API_BASE_URL}/postsTorneo`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los posts de torneo:", error);
    throw error;
  }
}

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