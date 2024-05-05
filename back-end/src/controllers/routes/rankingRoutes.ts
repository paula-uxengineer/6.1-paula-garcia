import { Router } from 'express';
import { RankingController } from '../controllers/rankingController';
import { RankingUseCase } from '../../usecases/rankingUseCase';
import { RankingRepository } from '../../frameworks/mysql/rankingRepository';

const rankingRouter = Router();

const rankingRepository = new RankingRepository();
const rankingUseCase = new RankingUseCase(rankingRepository);
const rankingController = new RankingController(rankingUseCase);

rankingRouter.get('/', (req, res) => rankingController.listRanking(req, res));
rankingRouter.get('/loser', (req, res) => rankingController.getLoser(req, res));
rankingRouter.get('/winner', (req, res) => rankingController.getWinner(req, res));
rankingRouter.get('/average-success-rate', (req, res) =>
  rankingController.getAverageSuccessRate(req, res)
);

export default rankingRouter;
