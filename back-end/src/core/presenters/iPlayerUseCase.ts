import { IPlayer } from 'core/entities/iPlayer';
import { IThrow } from 'core/entities/iThrow';

interface IPlayerUseCase {
  registerPlayer(name: string): Promise<IPlayer>;
  updatePlayerName(id: number, name: string): Promise<IPlayer | null>;
  findThrowsAndSuccessRate(playerId: number): Promise<{
    players: IPlayer[];
    averageSuccessRate: { playerName: string; successRate: number }[];
  }>;
}

export { IPlayerUseCase };
