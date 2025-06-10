import * as TorneoModel from '../models/torneoPostModel.js';

export async function getTorneoPosts() {
  return TorneoModel.getAllTorneoPosts();
}

export async function getTorneoPost(id: string) {
  return TorneoModel.getTorneoPostById(id);
}

export async function addTorneoPost(post: any) {
  return TorneoModel.insertTorneoPost(post);
}

export const updateAnswersCount = async (id: string, answers: number) => {
  return await TorneoModel.updateAnswersCountById(id, answers);
};

export async function editTorneoPost(id: string, updates: any) {
  return TorneoModel.updateTorneoPost(id, updates);
}

export async function removeTorneoPost(id: string) {
  return TorneoModel.deleteTorneoPost(id);
}
