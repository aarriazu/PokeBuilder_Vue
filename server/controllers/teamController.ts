import { Request, Response } from 'express';
import * as TeamService from '../services/teamService.js';

export async function createTeam(req: Request, res: Response): Promise<any> {
  try {
    const team = req.body;
    if (!team.ownerId) return res.status(400).send("ownerId es obligatorio");
    const result = await TeamService.createTeam(team);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTeam(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const teamData = req.body;
    await TeamService.updateTeam(id, teamData);
    res.status(200).json({ message: 'Equipo actualizado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTeamsByOwner(req: Request, res: Response) {
  try {
    const { ownerId } = req.params;
    const teams = await TeamService.getTeams(ownerId);
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function toggleFavorite(req: Request, res: Response) {
  try {
    const { ownerId } = req.params;
    const { teamId, favorite } = req.body;
    await TeamService.setFavorite(ownerId, teamId, favorite);
    res.status(200).json({ message: 'Favorito actualizado' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTeam(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await TeamService.removeTeam(id);
    res.status(200).json({ message: 'Equipo eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
export async function getTeamById(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const team = await TeamService.getTeamById(id);
    if (!team) return res.status(404).send("Equipo no encontrado");
    res.status(200).json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}