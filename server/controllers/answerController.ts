import { Request, Response } from 'express';
import * as AnswerService from '../services/answerService.js';
import * as PostService from '../services/postService.js';
import { ObjectId } from 'mongodb';

export async function createAnswer(req: Request, res: Response): Promise<any> {
  try {
    const answer = req.body;
    if (!answer.postId || !answer.author || !answer.content) {
      return res.status(400).json({ error: "Faltan datos requeridos para la respuesta" });
    }

    const inserted = await AnswerService.addAnswer(answer);

    // Obtener post y actualizar contador
    const post = await PostService.getPostById(answer.postId);
    const newCount = (post?.answers || 0) + 1;
    await PostService.updateAnswerCount(answer.postId, newCount);

    res.status(201).json({ insertedId: inserted.insertedId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAnswers(req: Request, res: Response): Promise<any> {
  try {
    const { postId } = req.query;
    if (!postId || typeof postId !== 'string' || !ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "postId inválido o no proporcionado" });
    }

    const answers = await AnswerService.getNestedAnswers(postId);
    res.status(200).json(answers);
  } catch (error: any) {
    console.error('Error en getAnswers:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateAnswer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { content, editedAt } = req.body;
    const username = (req as any).user?.username;

    await AnswerService.editAnswer(id, content, editedAt, username);
    res.status(200).json({ message: "Respuesta editada correctamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteAnswer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const username = (req as any).user?.username;

    await AnswerService.removeAnswer(id, username);
    res.status(200).json({ message: "Respuesta eliminada correctamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
