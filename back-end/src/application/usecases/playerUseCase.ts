import { IPlayer } from 'core/entities/iPlayer';
import { IPlayerRepository } from 'core/repositories/iPlayerRepository';
import { IThrow } from 'core/entities/iThrow';
import { PlayerRepository } from '../../infrastructure/mysql/playerRepository';

export class PlayerUseCase {
  constructor(private playerRepository: PlayerRepository) {}

  async registerPlayer(name: string): Promise<IPlayer> {
    try {
      const player = await this.playerRepository.registerPlayer(name || 'ANONIMOUS');
      return player;
    } catch (error) {
      console.error('Error registering player:', error);
      throw new Error('Error registering player');
    }
  }

  async updatePlayerName(id: number, name: string): Promise<IPlayer | null> {
    try {
      const updatedPlayer = await this.playerRepository.updatePlayerName(id, name);
      return updatedPlayer;
    } catch (error) {
      console.error('Error updating player name:', error);
      throw new Error('Error updating player name');
    }
  }

  async getPlayerThrows(playerId: number): Promise<{ throws: IThrow[]; successRate: number }> {
    try {
      const throwsInfo = await this.playerRepository.getPlayerThrows(playerId);
      return throwsInfo;
    } catch (error) {
      console.error('Error fetching player throws:', error);
      throw new Error('Error fetching player throws');
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
//   });
