import { Request, Response } from 'express';
import * as PostService from '../services/postService.js';


export async function getAllPosts(req: Request, res: Response) {
  const posts = await PostService.getPosts();
  res.json(posts);
}

export async function getPostById(req: Request, res: Response): Promise<any> {
  if (!req.params || !req.params.id) {
    return res.status(400).send("ID del post no proporcionado");
  }
  const { id } = req.params;
  const post = await PostService.getPost(id);
  if (!post) return res.status(404).send("Post no encontrado");
  res.json(post);
}

export async function createPost(req: Request, res: Response): Promise<any> {
  if (!req.body) return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "El título es obligatorio" });

  const inserted = await PostService.addPost(req.body);
  res.status(201).json({ insertedId: inserted.insertedId });
}

export async function updateAnswerCount(req: Request, res: Response): Promise<any> {
  try {
    const postId = req.params.id;
    const { answers } = req.body;

    if (typeof answers !== 'number') {
      return res.status(400).json({ error: 'El campo "answers" debe ser un número' });
    }

    await PostService.updateAnswerCount(postId, answers);
    res.status(200).json({ message: 'Contador de respuestas actualizado correctamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
}



export async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  await PostService.editPost(id, req.body);
  res.json({ message: "Post actualizado correctamente" });
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  await PostService.removePost(id);
  res.json({ message: "Post eliminado correctamente" });
}
