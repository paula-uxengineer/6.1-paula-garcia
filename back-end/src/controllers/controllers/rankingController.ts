import { Request, Response } from 'express';
import { RankingUseCase } from '../../usecases/rankingUseCase';

export class RankingController {
  constructor(private readonly rankingUseCase: RankingUseCase) {}

  async listRanking(req: Request, res: Response): Promise<void> {
    try {
      const ranking = await this.rankingUseCase.listRanking();
      res.status(200).json({ message: 'Ranking of all players: ', ranking });
    } catch (error) {
      console.error('Error listing ranking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getLoser(req: Request, res: Response): Promise<void> {
    try {
      const loser = await this.rankingUseCase.getLoser();
      res.status(200).json({ message: 'Top loser: ', loser });
    } catch (error) {
      console.error('Error getting loser:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getWinner(req: Request, res: Response): Promise<void> {
    try {
      const winner = await this.rankingUseCase.getWinner();
      res.status(200).json({ message: 'Top winner: ', winner });
    } catch (error) {
      console.error('Error getting winner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAverageSuccessRate(req: Request, res: Response): Promise<void> {
    try {
      const averageSuccessRate = await this.rankingUseCase.getAverageSuccessRate();
      res
        .status(200)
        .json({ message: 'Average success rate of all players: ', averageSuccessRate });
    } catch (error) {
      console.error('Error getting average success rate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
