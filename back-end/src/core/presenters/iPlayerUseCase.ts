import { IPlayer } from 'core/entities/iPlayer';
import { IThrow } from 'core/entities/iThrow';

interface IPlayerUseCase {
  registerPlayer(name: string): Promise<IPlayer>;
  updatePlayerName(id: number, name: string): Promise<IPlayer | null>;
  findThrowsAndSuccessRateByPlayerId(
    playerId: number
  ): Promise<{ throws: IThrow[]; successRate: number }>;
}

export { IPlayerUseCase };
