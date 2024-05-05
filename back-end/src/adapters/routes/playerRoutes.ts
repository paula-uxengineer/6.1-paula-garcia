import express from 'express';
import { PlayerController } from '../controllers/playerController';
import { PlayerUseCase } from '../../application/usecases/playerUseCase';
import { PlayerRepository } from '../../infrastructure/mysql/playerRepository';

const playerRouter = express.Router();

const playerRepository = new PlayerRepository();
const playerUseCase = new PlayerUseCase(playerRepository);
const playerController = new PlayerController(playerUseCase);

playerRouter.post('/', playerController.registerPlayer.bind(playerController));
playerRouter.put('/:id', playerController.updatePlayerName.bind(playerController));
playerRouter.get('/', playerController.getPlayerThrows.bind(playerController));
playerRouter.delete('/', playerController.deleteAllPlayers.bind(playerController));

export default playerRouter;
