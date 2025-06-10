import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import * as TorneoService from '../services/torneoPostService.js';

export async function getAllTorneoPosts(req: Request, res: Response) {
  try {
    const posts = await TorneoService.getTorneoPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting torneo posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getTorneoPostById(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const post = await TorneoService.getTorneoPost(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error getting torneo post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateTorneoAnswers = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { answers } = req.body;

  if (!id || typeof answers !== 'number') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    const result = await TorneoService.updateAnswersCount(id, answers);

    if (!result) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Answer count updated' });
  } catch (error) {
    console.error('Error updating answers count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export async function createTorneoPost(req: Request, res: Response) {
  try {
    const result = await TorneoService.addTorneoPost(req.body);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Error creating torneo post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateTorneoPost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const result = await TorneoService.editTorneoPost(id, updates);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating torneo post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteTorneoPost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await TorneoService.removeTorneoPost(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting torneo post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
