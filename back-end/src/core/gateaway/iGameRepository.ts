import { IThrow } from 'core/entities/iThrow';

export interface IGameRepository {
  createThrow(playerId: number, dice1: number, dice2: number, winner: boolean): Promise<void>;
  deleteThrows(playerId: number): Promise<void>;
  findThrowByPlayerId(playerId: number): Promise<IThrow[]>;
}