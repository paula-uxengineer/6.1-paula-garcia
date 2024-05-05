import { IRankingRepository } from '../core/gateaway/iRankingRepository';
import { IPlayer } from '../core/entities/iPlayer';

export class RankingUseCase {
  constructor(private readonly rankingRepository: IRankingRepository) {}

  async listRanking(): Promise<IPlayer[]> {
    return this.rankingRepository.listAll();
  }

  async getLoser(): Promise<IPlayer | null> {
    return this.rankingRepository.getLoser();
  }

  async getWinner(): Promise<IPlayer | null> {
    return this.rankingRepository.getWinner();
  }

  async getAverageSuccessRate(): Promise<number> {
    return this.rankingRepository.getAverageSuccessRate();
  }
}
