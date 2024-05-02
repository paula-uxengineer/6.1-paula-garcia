// import express, { Request, Response } from 'express';
// import { PlayerController } from 'adapters/controllers/playerController';
// import { GetPlayerUseCase } from 'application/usecases/player/getPlayersUsecase';
// import { UpdatePlayerNameUseCase } from '../../application/usecases/player/updateNameUsecase';
// import { CreatePlayerUseCase } from 'application/usecases/player/createPlayerUsecase';
// import { PlayerRepository } from 'infrastructure/mysql/playerRepository';
// import { RankingRepository } from 'infrastructure/mysql/rankingRepository';

// const router = express.Router();

// // Repositories
// const playerRepository = new PlayerRepository();
// const rankingRepository = new RankingRepository();

// // Usecases
// const getPlayerUseCase = new GetPlayerUseCase(rankingRepository);
// const updatePlayerNameUseCase = new UpdatePlayerNameUseCase(playerRepository);
// const createPlayerUseCase = new CreatePlayerUseCase(playerRepository);

// // Crear una instancia del controlador de jugadores
// const playerController = new PlayerController(
//   getPlayerUseCase,
//   updatePlayerNameUseCase,
//   createPlayerUseCase
// );

// // Definir las rutas
// router.post('/players', async (req: Request, res: Response) => {
//   await playerController.createPlayer(req, res);
// });

// router.put('/players/:id', async (req: Request, res: Response) => {
//   await playerController.updatePlayerName(req, res);
// });

// router.get('/players', async (req: Request, res: Response) => {
//   await playerController.getAllPlayers(req, res);
// });

// export default router;
