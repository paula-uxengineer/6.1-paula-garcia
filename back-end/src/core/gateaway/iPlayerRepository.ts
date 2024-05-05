import { IPlayer } from '../entities/iPlayer';
import { IThrow } from '../entities/iThrow';

export interface IPlayerRepository {
  createPlayer(player: IPlayer): Promise<IPlayer>;
  registerPlayer(name: string): Promise<IPlayer>;
  updatePlayerName(id: number, name: string): Promise<IPlayer | null>;
  findAllPlayers(): Promise<IPlayer[]>;
  findThrowsByPlayerId(playerId: number): Promise<IThrow[]>;
  deleteAllPlayers(): Promise<void>;
}
