import { IPlayerUseCase } from 'core/presenters/iPlayerUseCase';
import { IPlayer } from '../core/entities/iPlayer';
import { IThrow } from 'core/entities/iThrow';
import { PlayerRepository } from 'frameworks/mysql/playerRepository';

export class PlayerUseCase implements IPlayerUseCase {
  constructor(private playerRepository: PlayerRepository) {}

  async createPlayer(player: IPlayer): Promise<IPlayer> {
    console.log('Player created:', player);
    return await this.playerRepository.createPlayer(player);
  }

  async registerPlayer(name: string): Promise<IPlayer> {
    console.log('Register player:', name);
    return await this.playerRepository.registerPlayer(name);
  }

  async updatePlayerName(id: number, name: string): Promise<IPlayer | null> {
    console.log('Update name: ', name);
    return await this.playerRepository.updatePlayerName(id, name);
  }

  async findAllPlayers(): Promise<IPlayer[]> {
    console.log('Players founded');
    return await this.playerRepository.findAllPlayers();
  }

  async deleteAllPlayers(): Promise<void> {
    console.log('Players deleted');
    return await this.playerRepository.deleteAllPlayers();
  }

  async findThrowsAndSuccessRateByPlayerId(
    playerId: number
  ): Promise<{ throws: IThrow[]; successRate: number }> {
    try {
      const playerThrows = await this.playerRepository.findThrowsByPlayerId(playerId);

      const totalThrows = playerThrows.length;
      let totalWins = 0;

      playerThrows.forEach((throwItem) => {
        if (throwItem.winner) {
          totalWins++;
        }
      });

      // success rate
      const successRate = totalThrows > 0 ? (totalWins / totalThrows) * 100 : 0;

      // format success rate 00.00
      const roundedSuccessRate = Math.round(successRate * 100) / 100;

      console.table(playerThrows);
      console.table(successRate);
      return { throws: playerThrows, successRate: roundedSuccessRate };
    } catch (error) {
      console.error('Error calculating success rate:', error);
      throw new Error('Error calculating success rate');
    }
  }
}
