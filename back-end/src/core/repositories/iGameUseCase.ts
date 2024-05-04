import { IThrow } from 'core/entities/iThrow';

export interface IGameUseCase {
  createThrow(playerId: number, dice1: number, dice2: number, winner: boolean): Promise<IThrow>;
  deleteThrows(playerId: number): Promise<void>;
  findThrowByPlayerId(playerId: number): Promise<IThrow[]>;
}
