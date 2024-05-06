import express from 'express';
import { PlayerController } from '../controllers/playerController';
import { PlayerUseCase } from '../../usecases/playerUseCase';
import { PlayerRepository } from '../../frameworks/mysql/playerRepository';

const playerRouter = express.Router();

const playerRepository = new PlayerRepository();
const playerUseCase = new PlayerUseCase(playerRepository);
const playerController = new PlayerController(playerUseCase);

playerRouter.post('/database', playerController.createPlayer.bind(playerController));
playerRouter.get('/database', playerController.getAllPlayers.bind(playerController));
playerRouter.post('/', playerController.registerPlayer.bind(playerController));
playerRouter.put('/:id', playerController.updatePlayerName.bind(playerController));
playerRouter.get('/', playerController.getPlayerThrowsAndSuccessRate.bind(playerController));
playerRouter.delete('/database', playerController.deleteAllPlayers.bind(playerController));

export default playerRouter;
