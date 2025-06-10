import { Router } from 'express';
import * as controller from '../controllers/pokemonController.js';

const router = Router();

router.get('/', controller.getAllPokemon);
router.get('/:identifier', controller.getPokemonByIdOrName);

export default router;
