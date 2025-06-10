import { Router } from 'express';
import * as PostController from '../controllers/postController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post('/', PostController.createPost);
router.put('/:id/answers', PostController.updateAnswerCount);
router.put('/:id', authenticateToken, PostController.updatePost);
router.delete('/:id', authenticateToken, PostController.deletePost);

export default router;
