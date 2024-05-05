import { IPlayer } from 'core/entities/iPlayer';

export interface IRankingRepository {
  listAll(): Promise<IPlayer[]>;
  getLoser(): Promise<IPlayer | null>;
  getWinner(): Promise<IPlayer | null>;
  getAverageSuccessRate(): Promise<number>;
}
