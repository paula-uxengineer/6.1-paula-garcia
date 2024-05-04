import { Router } from 'express';
import { GameController } from '../controllers/gameController';
import { GameUseCase } from '../../application/usecases/gameUseCase';
import { GameRepository } from 'infrastructure/mysql/gameRepository';

const gameRouter = Router();

const gameRepository = new GameRepository();
const throwUseCase = new GameUseCase(gameRepository);
const gameController = new GameController(throwUseCase);

gameRouter.post('/:id', (req, res) => gameController.createThrow(req, res));

gameRouter.delete('/:id', (req, res) => gameController.deleteThrows(req, res));

gameRouter.get('/:id', (req, res) => gameController.findThrowByPlayerId(req, res));

export default gameRouter;
