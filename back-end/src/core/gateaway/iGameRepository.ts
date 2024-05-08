import { IThrow } from 'core/entities/iThrow';

export interface IGameRepository {
  createThrow(playerId: number): Promise<void>;
  deleteThrows(playerId: number): Promise<void>;
  findThrowByPlayerId(playerId: number): Promise<IThrow[]>;
}
