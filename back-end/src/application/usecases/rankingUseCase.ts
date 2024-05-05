import { IRankingRepository } from '../../core/repositories/iRankingRepository';
import { IPlayer } from '../../core/entities/iPlayer';

export class RankingUseCase {
  constructor(private readonly rankingRepository: IRankingRepository) {}

  async listRanking(): Promise<IPlayer[]> {
    return this.rankingRepository.listAll();
  }

  async getLoser(): Promise<IPlayer | null> {
    const ranking = await this.listRanking();
    return (
      ranking.reduce((acc, player) => {
        return acc.successRate! < player.successRate! ? acc : player;
      }, ranking[0]) || null
    );
  }

  async getWinner(): Promise<IPlayer | null> {
    const ranking = await this.listRanking();
    return (
      ranking.reduce((acc, player) => {
        return acc.successRate! > player.successRate! ? acc : player;
      }, ranking[0]) || null
    );
  }

  async getAverageSuccessRate(): Promise<number> {
    const ranking = await this.listRanking();
    if (ranking.length === 0) return 0;

    const totalSuccessRate = ranking.reduce((acc, player) => acc + player.successRate!, 0);
    return totalSuccessRate / ranking.length;
  }
}
