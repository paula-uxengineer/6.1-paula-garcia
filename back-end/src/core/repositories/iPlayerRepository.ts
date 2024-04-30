import { IPlayer } from 'core/entities/iPlayer';

export interface IPlayerRepository {
  findAll(): Promise<IPlayer[]>;
  findById(id: number): Promise<IPlayer | null>;
  create(player: IPlayer): Promise<IPlayer>;
  update(id: number, player: Partial<IPlayer>): Promise<IPlayer | null>;
  delete(id: number): Promise<boolean>;
}
