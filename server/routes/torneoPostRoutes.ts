import { Router } from 'express';
import * as TorneoController from '../controllers/torneoPostController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', TorneoController.getAllTorneoPosts);
router.get('/:id', TorneoController.getTorneoPostById);
router.post('/', TorneoController.createTorneoPost);
router.put('/:id/answers', TorneoController.updateTorneoAnswers);
router.put('/:id', authenticateToken, TorneoController.updateTorneoPost);
router.delete('/:id', authenticateToken, TorneoController.deleteTorneoPost);

export default router;
