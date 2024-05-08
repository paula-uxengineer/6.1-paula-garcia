import { IGameUseCase } from 'core/presenters/iGameUseCase';

export class GameUseCase implements IGameUseCase {
  constructor(private gameRepository: IGameUseCase) {}

  async createThrow(playerId: number): Promise<void> {
    return await this.gameRepository.createThrow(playerId);
  }

  async deleteThrows(playerId: number): Promise<void> {
    await this.gameRepository.deleteThrows(playerId);
  }

  async findThrowByPlayerId(playerId: number) {
    return await this.gameRepository.findThrowByPlayerId(playerId);
  }
}
