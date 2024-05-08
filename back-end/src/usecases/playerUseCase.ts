import { IPlayerUseCase } from 'core/presenters/iPlayerUseCase';
import { IPlayer } from '../core/entities/iPlayer';
import { PlayerRepository } from 'frameworks/mysql/playerRepository';

export class PlayerUseCase implements IPlayerUseCase {
  constructor(private playerRepository: PlayerRepository) {}

  async createPlayer(player: IPlayer): Promise<IPlayer> {
    return await this.playerRepository.createPlayer(player);
  }

  async registerPlayer(name: string): Promise<IPlayer> {
    return await this.playerRepository.registerPlayer(name);
  }

  async updatePlayerName(id: number, name: string): Promise<IPlayer | null> {
    return await this.playerRepository.updatePlayerName(id, name);
  }

  async findAllPlayers(): Promise<IPlayer[]> {
    return await this.playerRepository.findAllPlayers();
  }

  async deleteAllPlayers(): Promise<void> {
    return await this.playerRepository.deleteAllPlayers();
  }

  async findThrowsAndSuccessRate(playerId: number): Promise<{
    players: IPlayer[];
    averageSuccessRate: { playerName: string; successRate: number }[];
  }> {
    try {
      const players = await this.playerRepository.findAllPlayers();

      const averageSuccessRate = players.map((player) => {
        const throws = player.throws;
        const winners = throws.filter((thr) => thr.winner);
        const successRate = throws.length > 0 ? (winners.length / throws.length) * 100 : 0;

        const roundedSuccessRate = Math.round(successRate * 100) / 100; //format 00.00
        return { playerName: player.name, successRate: roundedSuccessRate };
      });
      return { players, averageSuccessRate };
    } catch (error) {
      console.error('Error calculating success rates:', error);
      throw new Error('Error calculating success rates');
    }
  }
}
