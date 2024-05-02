import { IThrow } from 'core/entities/iThrow';

export interface IGameRepository {
  createThrow(playerId: number, dice1: number, dice2: number, winner: boolean): Promise<IThrow>;
  deleteThrows(playerId: number): Promise<void>;
  findByPlayerId(playerId: number): Promise<IThrow[]>;
}