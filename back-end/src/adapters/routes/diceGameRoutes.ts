import { Router } from 'express';
import { test } from 'adapters/controllers/diceGameController';

const router = Router();

router.get('/', test);

export default router;
