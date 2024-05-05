import { IPlayerUseCase } from 'core/repositories/iPlayerUseCase';
import { IPlayer } from '../../core/entities/iPlayer';
import { IPlayerRepository } from '../../core/repositories/iPlayerRepository';
import { IThrow } from 'core/entities/iThrow';

export class PlayerUseCase implements IPlayerUseCase {
  constructor(private playerRepository: IPlayerRepository) {}

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

  async findThrowsAndSuccessRateByPlayerId(
    playerId: number
  ): Promise<{ throws: IThrow[]; successRate: number }> {
    return await this.playerRepository.findThrowsAndSuccessRateByPlayerId(playerId);
  }

  async deleteAllPlayers(): Promise<void> {
    try {
      await this.playerRepository.deleteAllPlayers();
    } catch (error) {
      console.error('Error deleting all players:', error);
      throw new Error('Error deleting all players');
    }
  }
}

// const playerUseCase = new PlayerUseCase(new PlayerRepository());
// playerUseCase
//   .getPlayerThrows(14)
//   .then((player) => {
//     console.log('Player registered:', player);
//   })
//   .catch((error) => {
//     console.error('Error registering player:', error);
//   }
