import { IThrow } from '../../core/entities/iThrow';
import { IGameUseCase } from 'core/repositories/iGameUseCase';

export class GameUseCase implements IGameUseCase {
  constructor(private gameRepository: IGameUseCase) {}

  async createThrow(
    playerId: number,
    dice1: number,
    dice2: number,
    winner: boolean
  ): Promise<IThrow> {
    return await this.gameRepository.createThrow(playerId, dice1, dice2, winner);
  }

  async deleteThrows(playerId: number): Promise<void> {
    await this.gameRepository.deleteThrows(playerId);
  }

  async findThrowByPlayerId(playerId: number) {
    return await this.gameRepository.findThrowByPlayerId(playerId);
  }
}
