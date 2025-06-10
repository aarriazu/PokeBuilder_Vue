import { Router } from 'express';
import * as AnswerController from '../controllers/answerController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', AnswerController.createAnswer);
router.get('/', AnswerController.getAnswers);
router.put('/:id', authenticateToken, AnswerController.updateAnswer);
router.delete('/:id', authenticateToken, AnswerController.deleteAnswer);

export default router;
