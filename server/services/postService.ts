import * as PostModel from '../models/postModel.js';

export async function getPosts() {
  return PostModel.getAllPosts();
}

export async function getPost(id: string) {
  return PostModel.findPostById(id);
}

export async function getPostById(postId: string) {
  return PostModel.findPostById(postId);
}

export async function addPost(post: any) {
  return PostModel.insertPost(post);
}

export async function updateAnswerCount(postId: string, count: number) {
  return PostModel.updateAnswerCount(postId, count);
}

export async function editPost(id: string, updates: any) {
  return PostModel.updatePost(id, updates);
}

export async function removePost(id: string) {
  return PostModel.deletePost(id);
}
