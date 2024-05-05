import { Request, Response } from 'express';
import { RankingUseCase } from '../../../src/application/usecases/rankingUseCase';

export class RankingController {
  constructor(private readonly rankingUseCase: RankingUseCase) {}

  async listRanking(req: Request, res: Response): Promise<void> {
    try {
      const ranking = await this.rankingUseCase.listRanking();
      res.status(200).json(ranking);
    } catch (error) {
      console.error('Error listing ranking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getLoser(req: Request, res: Response): Promise<void> {
    try {
      const loser = await this.rankingUseCase.getLoser();
      res.status(200).json(loser);
    } catch (error) {
      console.error('Error getting loser:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getWinner(req: Request, res: Response): Promise<void> {
    try {
      const winner = await this.rankingUseCase.getWinner();
      res.status(200).json(winner);
    } catch (error) {
      console.error('Error getting winner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAverageSuccessRate(req: Request, res: Response): Promise<void> {
    try {
      const averageSuccessRate = await this.rankingUseCase.getAverageSuccessRate();
      res.status(200).json({ averageSuccessRate });
    } catch (error) {
      console.error('Error getting average success rate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
