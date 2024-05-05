import { IPlayer } from '../entities/iPlayer';
import { IThrow } from '../entities/iThrow';

export interface IPlayerRepository {
  createPlayer(player: IPlayer): Promise<IPlayer>;
  registerPlayer(name: string): Promise<IPlayer>;
  updatePlayerName(id: number, name: string): Promise<IPlayer | null>;
  findAllPlayers(): Promise<IPlayer[]>;
  findThrowsAndSuccessRateByPlayerId(
    playerId: number
  ): Promise<{ throws: IThrow[]; successRate: number }>;
  deleteAllPlayers(): Promise<void>;
}
