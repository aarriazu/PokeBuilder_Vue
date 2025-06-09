import * as TeamModel from '../models/teamModel.js';

export async function createTeam(team: any) {
  return TeamModel.insertTeam(team);
}

export async function updateTeam(id: string, data: any) {
  return TeamModel.updateTeam(id, data);
}

export async function getTeams(ownerId: string) {
  return TeamModel.getTeamsByOwner(ownerId);
}

export async function setFavorite(ownerId: string, teamId: string, favorite: boolean) {
  return TeamModel.toggleFavorite(ownerId, teamId, favorite);
}

export async function removeTeam(id: string) {
  return TeamModel.deleteTeam(id);
}
export async function getTeamById(id: string) {
  const teams = await TeamModel.getTeamsByOwner(id);
  return teams.find(team => team._id.toString() === id);
}