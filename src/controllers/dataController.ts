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

export function formatText(text: string): string {
  const modText = text[0].toUpperCase() + text.slice(1);
  return modText.replace('-', ' ');
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

export async function getPostById(id: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el post:", error);
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