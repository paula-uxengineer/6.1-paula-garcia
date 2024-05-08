import { IThrow } from 'core/entities/iThrow';

export interface IGameUseCase {
  createThrow(playerId: number): Promise<void>;
  deleteThrows(playerId: number): Promise<void>;
  findThrowByPlayerId(playerId: number): Promise<IThrow[]>;
}
