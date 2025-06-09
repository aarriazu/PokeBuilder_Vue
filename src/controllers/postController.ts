import API from './api';

export interface PostData {
  title: string;
  author: string;
  subforum: string;
  answers: number;
  content: string;
  createdAt: string;
  editedAt: string;
}

export async function createPost(postData: PostData): Promise<PostData> {
  try {
    const response = await API.post<PostData>('/posts', postData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error;
  }
}
