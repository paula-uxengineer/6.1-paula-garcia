import { PrismaClient } from '../../../prisma/generator/client';
import { IRankingRepository } from '../../core/gateaway/iRankingRepository';
import { IPlayer } from 'core/entities/iPlayer';

const prisma = new PrismaClient();

export class RankingRepository implements IRankingRepository {
  async listAll(): Promise<IPlayer[]> {
    try {
      const players = await prisma.player.findMany({
        include: {
          throws: true
        }
      });

      players.forEach((player) => {
        const successfulThrows = player.throws.filter((t) => t.winner);
        player.successRate = (successfulThrows.length / player.throws.length) * 100 || 0;
      });

      players.sort((a, b) => b.successRate! - a.successRate!);

      return players;
    } catch (error) {
      console.error('Error finding all players for ranking:', error);
      throw new Error('Error finding all players for ranking');
    }
  }

  async getLoser(): Promise<IPlayer | null> {
    try {
      const ranking = await this.listAll();

      const loser =
        ranking.reduce(
          (acc, player) => (acc.successRate! < player.successRate! ? acc : player),
          ranking[0]
        ) || null;

      console.log('Loser:');
      console.table(loser);
      return loser;
    } catch (error) {
      console.error('Error finding loser:', error);
      throw new Error('Error finding loser');
    }
  }

  async getWinner(): Promise<IPlayer | null> {
    try {
      const ranking = await this.listAll();

      const winner =
        ranking.reduce(
          (acc, player) => (acc.successRate! > player.successRate! ? acc : player),
          ranking[0]
        ) || null;

      console.log('Winner:');
      console.table(winner);
      return winner;
    } catch (error) {
      console.error('Error finding winner:', error);
      throw new Error('Error finding winner');
    }
  }

  async getAverageSuccessRate(): Promise<number> {
    try {
      const ranking = await this.listAll();
      if (ranking.length === 0) return 0;

      const totalSuccessRate = ranking.reduce((acc, player) => acc + player.successRate!, 0);
      const averageSuccessRate = totalSuccessRate / ranking.length;

      const roundedAverageSuccessRate = parseFloat(averageSuccessRate.toFixed(2));

      console.log('Average success rate of all players:', roundedAverageSuccessRate);
      return roundedAverageSuccessRate;
    } catch (error) {
      console.error('Error calculating average success rate:', error);
      throw new Error('Error calculating average success rate');
    }
  }
}
