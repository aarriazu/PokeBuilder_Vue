import { Router } from 'express';
import * as TeamsController from '../controllers/teamController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', TeamsController.createTeam);
router.put('/:id', TeamsController.updateTeam);
router.get('/:ownerId', TeamsController.getTeamsByOwner);
router.get('/:id', TeamsController.getTeamById);
router.put('/:ownerId/favorite', TeamsController.toggleFavorite);
router.delete('/:id', TeamsController.deleteTeam);

export default router;
